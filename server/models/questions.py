#!/usr/bin/python3
""" This script define Questions object """

import models
from models.basemodel import Base, BaseModel
import sqlalchemy
from sqlalchemy import Column, String, Table, ForeignKey
from sqlalchemy.orm import relationship


class Question(Base, BaseModel):
    """ Question Class definition """
    __tablename__ = 'questions'
    name = Column(String(128), nullable=True)
    text = Column(String(1024), nullable=False)
    answers = relationship("Answer", back_populates="question",
                           cascade="all, delete-orphan")
    quiz_id = Column(String(60), ForeignKey('quizzes.id'), nullable=True)
    quiz = relationship('Quiz', back_populates='questions')

    def __init__(self, *args, **kwargs):
        """ initializes question """
        super().__init__(*args, **kwargs)
