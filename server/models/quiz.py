from models.basemodel import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

class Quiz(Base, BaseModel):
    """ Quiz Class definition """
    __tablename__ = 'quizzes'
    
    theme = Column(String(128), nullable=True)
    title = Column(String(128), nullable=False)
    creator_id = Column(String(60), ForeignKey('teachers.id'), nullable=False)
    creator = relationship('Teacher', back_populates='quizzes')
    questions = relationship('Question', back_populates='quiz', cascade='all, delete-orphan')

    def __init__(self, *args, **kwargs):
        """ initializes quiz """
        super().__init__(*args, **kwargs)
