from models.user import User
from sqlalchemy import Column
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Table, ForeignKey
from models.quiz import Quiz  # Import Quiz class if needed

class Teacher(User):
    """ Teacher Class definition """
    __tablename__ = 'teachers'

    quizzes = relationship('Quiz', back_populates='creator')

    def __init__(self, *args, **kwargs):
        """ initializes question """
        super().__init__(*args, **kwargs)

    def create_quiz(self, title, questions):
        """Method to create a quiz"""
        new_quiz = Quiz(title=title, creator=self)
        # new_quiz.save()
        for question in questions:
            new_quiz.questions.append(question)
        # Add new_quiz to storage and save
        # Example: storage.new(new_quiz)
        # storage.save()
        return new_quiz
