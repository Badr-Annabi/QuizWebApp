import unittest
import json
from app import create_app, db
from models.user import User

class AppTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.app.config.from_object('test_config.TestingConfig')
        cls.client = cls.app.test_client()
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()
        cls.app_context.pop()

    def setUp(self):
        self.client.post('/signup', json={
            'email': 'test@example.com',
            'password': 'password',
            'first_name': 'Test',
            'last_name': 'User'
        })
        self.login_response = self.client.post('/login', json={
            'email': 'test@example.com',
            'password': 'password'
        })
        self.cookies = self.login_response.headers.getlist('Set-Cookie')

    def test_signup(self):
        response = self.client.post('/signup', json={
            'email': 'newuser@example.com',
            'password': 'newpassword',
            'first_name': 'New',
            'last_name': 'User'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('newuser@example.com', response.data.decode())

    def test_login(self):
        self.assertEqual(self.login_response.status_code, 200)
        self.assertIn('session=', self.cookies[0])

    def test_create_quiz(self):
        response = self.client.post('/quizzes', 
            json={'creator_id': 1, 'title': 'Sample Quiz', 'questions': [{'text': 'What is 2+2?'}]},
            headers={'Cookie': self.cookies[0]})
        self.assertEqual(response.status_code, 201)
        self.assertIn('Sample Quiz', response.data.decode())

    def test_unauthorized_access(self):
        response = self.client.post('/quizzes', 
            json={'creator_id': 1, 'title': 'Sample Quiz', 'questions': [{'text': 'What is 2+2?'}]})
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()
