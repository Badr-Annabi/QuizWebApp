from models.base import BaseModel

from redis_cashing import db
from models.answer import Answer

class Question(BaseModel):
    __tablename__ = 'questions'
    text = db.Column(db.String(255), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    answers = db.relationship('Answer', backref='questions')


    def get_correct_answer(self):
        """ get the correct answer object for a specific question"""
        # print(next((answer for answer in self.answers if answer.is_correct), None))
        return next((answer for answer in self.answers if answer.is_correct), None)