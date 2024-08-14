# import unittest
# from models import storage
# from models.questions import Question
# from models.answers import Answer
# from models.user import User
# from sqlalchemy.exc import IntegrityError
# from dotenv import load_dotenv
# import os


# class TestModels(unittest.TestCase):
#     @classmethod
#     def setUpClass(cls):
#         """Set up the test database."""
#         dotenv_path = os.path.join(os.path.dirname(__file__), '.', '.env.test')
#         load_dotenv(dotenv_path=dotenv_path)
#         cls.storage = storage
#         cls.storage.clear_data()

#     def setUp(self):
#         """Set up individual test case."""
#         self.question = Question(name="Sample Question",
#                                  text="What is the sample question?")
#         self.answer = Answer(text="Sample Answer", is_correct=True,
#                              question=self.question)
#         self.user = User(email="user@example.com", password="password123",
#                          first_name="John", last_name="Doe")

#     def test_question_creation(self):
#         """Test question creation and retrieval."""
#         self.storage.new(self.question)
#         # self.storage.save()
#         retrieved_question = self.storage.get(Question, self.question.id)
#         self.assertIsNotNone(retrieved_question)
#         self.assertEqual(retrieved_question.text,
#                          "What is the sample question?")

#     def test_answer_creation(self):
#         """Test answer creation and retrieval."""
#         self.storage.new(self.question)  # Add question before answer
#         # self.storage.save()
#         self.storage.new(self.answer)
#         # self.storage.save()
#         retrieved_answer = self.storage.get(Answer, self.answer.id)
#         self.assertIsNotNone(retrieved_answer)
#         self.assertEqual(retrieved_answer.text, "Sample Answer")
#         self.assertEqual(retrieved_answer.question_id, self.question.id)

#     def test_question_answer_relationship(self):
#         """Test the relationship between Question and Answer."""
#         self.storage.new(self.question)
#         # self.storage.save()
#         self.storage.new(self.answer)
#         # self.storage.save()
#         retrieved_question = self.storage.get(Question, self.question.id)
#         self.assertIsNotNone(retrieved_question)
#         self.assertEqual(len(retrieved_question.answers), 1)
#         self.assertEqual(retrieved_question.answers[0].text, "Sample Answer")

#     def test_user_creation(self):
#         """Test user creation and retrieval."""
#         self.storage.new(self.user)
#         self.storage.save()
#         retrieved_user = self.storage.get(User, self.user.id)
#         self.assertIsNotNone(retrieved_user)
#         self.assertEqual(retrieved_user.email, "user@example.com")
#         self.assertEqual(retrieved_user.first_name, "John")
#         self.assertEqual(retrieved_user.last_name, "Doe")

#     @classmethod
#     def tearDownClass(cls):
#         """Tear down the test database."""
#         cls.storage.clear_data()
#         cls.storage.close()


# if __name__ == "__main__":
#     unittest.main()
