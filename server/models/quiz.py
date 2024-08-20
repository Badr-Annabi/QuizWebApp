from models.base import BaseModel
from redis_cashing import db


class Quiz(BaseModel):
    __tablename__ = 'quizzes'
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    level = db.Column(db.String(10), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # creator = db.relationship('User', backref='quizzes')
    questions = db.relationship('Question', backref='quiz', lazy=True)

    taken_by_users = db.relationship('UserQuiz', backref='quiz', lazy=True)
