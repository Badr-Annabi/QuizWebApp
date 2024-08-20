from models.base import BaseModel

from redis_cashing import db
from models.answer import Answer

class Question(BaseModel):
    __tablename__ = 'questions'
    text = db.Column(db.String(255), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    answers = db.relationship('Answer', backref='questions', lazy=True)


    def get_correct_answer(self):
        """ get the correct answer object for a specific question"""
        return self.answers.filter(Answer.is_correct == True).first()