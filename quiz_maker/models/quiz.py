from app import db
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import Base, BaseModel
from models.question import Question

class Quiz(Base, BaseModel):
    """ Quiz Class definition """
    __tablename__ = 'quizzes'
    
    title = Column(String(128), nullable=False)
    creator_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    creator = relationship('User', back_populates='quizzes')
    questions = relationship('Question', back_populates='quiz', cascade='all, delete-orphan')

    def __init__(self, *args, **kwargs):
        """ initializes quiz """
        super().__init__(*args, **kwargs)
