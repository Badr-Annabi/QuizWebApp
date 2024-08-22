from models.base import BaseModel
from redis_cashing import db

class Answer(BaseModel):
    __tablename__ = 'answers'
    text = db.Column(db.String(255), nullable=False)
    isCorrect = db.Column(db.Boolean, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
