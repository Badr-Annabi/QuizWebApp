from models.base import BaseModel
from db import db

class Quiz(BaseModel):
    __tablename__ = 'quizzes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    creator = db.relationship('User', backref='quizzes')
    questions = db.relationship('Question', backref='quiz', lazy=True)
