#!/usr/bin/python3su
""" This script define answer object """

from models.basemodel import Base, BaseModel
import sqlalchemy
from sqlalchemy import Column, String, Table, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class Answer(Base, BaseModel):
    """ Course Class definition """
    __tablename__ = 'answers'

    question_id = Column(String(60), ForeignKey('questions.id'),
                         nullable=False)
    text = Column(String(128), nullable=False)
    is_correct = Column(Boolean, nullable=False)
    question = relationship('Question', back_populates='answers')
    student_id = Column(String(60), ForeignKey('students.id'), nullable=True)
    student = relationship('Student', back_populates='answers')

    def __init__(self, *args, **kwargs):
        """ initializes course """
        super().__init__(*args, **kwargs)
