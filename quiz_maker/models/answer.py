from app import db
from sqlalchemy import Column, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from models.base_model import Base, BaseModel
from models.question import Question
from models.user import User

class Answer(Base, BaseModel):
    """ Answer Class definition """
    __tablename__ = 'answers'

    question_id = Column(String(60), ForeignKey('questions.id'), nullable=False)
    text = Column(String(128), nullable=False)
    is_correct = Column(Boolean, nullable=False)
    question = relationship('Question', back_populates='answers')
    student_id = Column(String(60), ForeignKey('users.id'), nullable=True)
    student = relationship('User', back_populates='answers')

    def __init__(self, *args, **kwargs):
        """ initializes answer """
        super().__init__(*args, **kwargs)
