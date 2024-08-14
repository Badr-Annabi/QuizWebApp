#!/usr/bin/python3
""" Test the database setup """

from dotenv import load_dotenv
from models import storage
from models.user import User
from models.questions import Question
from models.answers import Answer

# Load environment variables
# load_dotenv()


def test_database():
    
    
    # # Create a new User
    # user = User(password="secure_password", email="test@example.com", first_name="John", last_name="Doe")
    # user.save()
    # print("User created:", user.to_dict())
    # print(user)

    # # # Create a new Question
    # # question = Question(text="What is the capital of Italy?")
    # # question.save()
    # # print("Question created:", question)

    # # # Create Answers for the Question
    # # answer1 = Answer(question_id=question.id, text="Rome", is_correct=True)
    # # answer2 = Answer(question_id=question.id, text="Milan", is_correct=False)
    # # answer3 = Answer(question_id=question.id, text="Venice", is_correct=False)
    # # answer1.save()
    # # answer2.save()
    # # answer3.save()
    # # print("Answers created:", answer1, answer2, answer3)

    # # Retrieve all Users
    # all_users = storage.all(User)
    # print("All users in database:", all_users)

    # # Retrieve all Questions
    # all_questions = storage.all(Question)
    # print("All questions in database:", all_questions)

    # # Retrieve all Answers
    # all_answers = storage.all(Answer)
    # print("All answers in database:", all_answers)

    # # Test retrieving a specific user
    # retrieved_user = storage.get(User, user.id)
    # print("Retrieved user:", retrieved_user)

    # # Test updating a question
    # question = Question(text="What is the capital of Italy?")
    # question.text = "What is the capital of France?"
    # question.save()
    # updated_question = storage.get(Question, question.id)
    # print("Updated question:", updated_question)

    # # Test deleting an answer
    # storage.delete(answer1)
    # storage.save()
    # print("Deleted answer:", answer1)

    # # Clean up: delete all created records
    # for user in all_users.values():
    #     storage.delete(user)
    # for question in all_questions.values():
    #     storage.delete(question)
    # for answer in all_answers.values():
    #     storage.delete(answer)
    # storage.save()
    # print("Clean up complete.")



    # Create a new Question
    question = Question(text="What is the capital of France?")
    question.save()

    # Create Answers for the Question
    answer1 = Answer(question_id=question.id, text="Paris", is_correct=True)
    answer2 = Answer(question_id=question.id, text="Lyon", is_correct=False)
    answer3 = Answer(question_id=question.id, text="Marseille", is_correct=False)
    answer1.save()
    answer2.save()
    answer3.save()

    # Add answers to the question
    question.answers.append(answer1)
    question.answers.append(answer2)
    question.answers.append(answer3)
    question.save()

    # Retrieve and print answers for a specific question
    retrieved_question = storage.get(Question, question.id)
    for answer in retrieved_question.answers:
        if (answer.is_correct is True):
            print("Correct answer:", answer.text)


if __name__ == "__main__":
    test_database()
