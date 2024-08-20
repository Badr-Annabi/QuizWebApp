from models.base import BaseModel
from redis_cashing import db
from datetime import datetime
from models.user import User
from models.quiz import Quiz


class UserQuiz(BaseModel):
    __tablename__ = 'user_quizzes'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), primary_key=True, nullable=False)
    raw_score = db.Column(db.Integer, nullable=False)
    date_taken = db.Column(db.Datetime, default=datetime.utcnow)
