#!/usr/bin/python3
""" This script define User object """

from models.basemodel import Base, BaseModel
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from models.encrypte import hash_password


class User(Base, BaseModel):
    """ User Class definition """
    __tablename__ = "users"

    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=True)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    quizzes = relationship('Quiz', back_populates='user')
    answers = relationship('Answer', back_populates='user')

    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)
        # if 'password' in kwargs:
        #     self.password = kwargs['password']
        # if 'email' in kwargs:
        #     self.email = kwargs['email']
        # if 'first_name' in kwargs:
        #     self.first_name = kwargs['first_name']
        # if 'last_name' in kwargs:
        #     self.last_name = kwargs['last_name']

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = hash_password(value)
        super().__setattr__(name, value)

     def answer_question(self, question_id, text, is_correct):
        """Method for a student to answer a question"""
        answer = Answer(text=text, is_correct=is_correct, question_id=question_id)
        # Add answer to storage and save
        self.answers.append(answer)
    
        return answer
    
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
