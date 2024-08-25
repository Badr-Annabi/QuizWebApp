import unittest
import subprocess
import os
from app import create_app, db
from models.user import User
import json
import requests

class AppTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.app.config.from_object('config.TestingConfig')
        cls.client = cls.app.test_client()
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()
        cls.app_context.pop()

    def save_cookies(self, url, login_data, file_path):
        response = requests.post(url, json=login_data)
        if response.status_code == 200:
            cookies = response.cookies
            with open(file_path, 'w') as file:
                json.dump(cookies.get_dict(), file)
        else:
            print("Login failed")
    
    def load_cookies(self, file_path):
        with open(file_path, 'r') as file:
            return  json.load(file)

    def setUp(self):

        
        User.query.filter_by(email='test@example.com').delete()
        db.session.commit()
        # Create a new user
        signup_data = {
            'firstName': 'fahd',
            'lastName': 'Benchekroun',
            'email': 'test@example.com',
            'password': 'password'
        }
        self.user = User.create(**signup_data)
        
        # Log in and generate cookies.txt
        login_url = 'http://localhost:5000/login'
        login_data = {
            'email': 'test@example.com',
            'password': 'password'
        }
        
        # Read cookies from cookies.txt
        try:
            if (self.user):
                print(f"Attempting to login to {login_url} with email {login_data['email']}")
                response = requests.post(login_url, json=login_data)
                print(f"Login response status code: {response.status_code}")
                
                if response.status_code == 200:
                    print("Login successful!")
                    # Save cookies to file
                    cookies = response.cookies
                    print(f"Saving cookies to cookies.json")
                    with open('cookies.json', 'w') as file:
                        json.dump(cookies.get_dict(), file)
                    self.cookies = cookies
                else:
                    print("Login failed")
                    raise Exception("Failed to login")
        except Exception as e:
            print(f"An error occurred during setup: {str(e)}")
            raise
        
        print("Setup completed")



    # def test_signup(self):
    #     response = self.client.post('/signup', json={
    #         'email': 'newuser@example.com',
    #         'password': 'newpassword',
    #         'firstName': 'New',
    #         'lastName': 'User'
    #     })
    #     self.assertEqual(response.status_code, 201)
    #     self.assertIn('newuser@example.com', response.data.decode())

    
    def test_create_quiz(self):
        response = self.client.post('/quizzes', 
            json={'creator_id': self.user.id, 'title': 'Sample Quiz', 'questions': [{'text': 'What is 2+2?'}]},
            headers={'Cookie': self.cookies})
        # print(response.text)
        self.assertEqual(response.status_code, 201)
        self.assertIn('Quiz created successfully', response.data.decode())

    def test_unauthorized_access(self):
        print(f"User_id: {self.user.id}")
        response = self.client.post('/quizzes', 
            json={'creator_id': self.user.id, 'title': 'Sample Quiz', 'questions': [{'text': 'What is 2+2?'}]})
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()
