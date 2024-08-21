from models.base import BaseModel
from redis_cashing import db


class Quiz(BaseModel):
    __tablename__ = 'quizzes'
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    level = db.Column(db.String(10), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    questions = db.relationship('Question', backref='quiz', cascade="all, delete-orphan")

    taken_by_users = db.relationship('UserQuiz', backref='quiz', cascade="all, delete-orphan")

    def to_dict(self):
        """Return a dictionary representation of the Quiz."""
        quiz_dict = super().to_dict()
        quiz_dict['questions'] = [question.to_dict() for question in self.questions]
        return quiz_dict
    
    def all_correct_answers(self):
        """ return a list of all correct answers"""

        for question in self.questions:
            all_correct_answers = {}
            for answer in question.answers:
                if answer.is_correct:
                    all_correct_answers[question] = answer

        return all_correct_answers



