from app import db
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from models.base_model import Base, BaseModel
from models.encrypte import hash_password

class User(Base, BaseModel):
    """ User Class definition """
    __tablename__ = "users"

    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=True)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    quizzes = relationship('Quiz', back_populates='creator')
    answers = relationship('Answer', back_populates='student')

    def __setattr__(self, name, value):
        """Sets a password with encryption"""
        if name == "password":
            value = hash_password(value)
        super().__setattr__(name, value)

    def answer_question(self, question_id, text, is_correct):
        """Method for a user to answer a question"""
        answer = Answer(text=text, is_correct=is_correct, question_id=question_id, student=self)
        db.session.add(answer)
        db.session.commit()
        return answer

    def create_quiz(self, title, questions):
        """Method to create a quiz"""
        new_quiz = Quiz(title=title, creator=self)
        for question_data in questions:
            question = Question(text=question_data['text'])
            new_quiz.questions.append(question)
        db.session.add(new_quiz)
        db.session.commit()
        return new_quiz
