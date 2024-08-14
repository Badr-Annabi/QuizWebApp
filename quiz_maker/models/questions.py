from app import db
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import Base, BaseModel
from models.answer import Answer
from models.quiz import Quiz

class Question(Base, BaseModel):
    """ Question Class definition """
    __tablename__ = 'questions'
    
    text = Column(String(1024), nullable=False)
    answers = relationship('Answer', back_populates='question', cascade='all, delete-orphan')
    quiz_id = Column(String(60), ForeignKey('quizzes.id'), nullable=True)
    quiz = relationship('Quiz', back_populates='questions')

    def __init__(self, *args, **kwargs):
        """ initializes question """
        super().__init__(*args, **kwargs)
