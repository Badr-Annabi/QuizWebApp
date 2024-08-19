from models.base import BaseModel
from db import db

class Question(BaseModel):
    __tablename__ = 'questions'
    text = db.Column(db.String(255), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    answers = db.relationship('Answer', backref='questions', lazy=True)
