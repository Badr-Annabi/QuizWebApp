from models.base import BaseModel

from redis_cashing import db
from models.answer import Answer

class Question(BaseModel):
    __tablename__ = 'questions'
    text = db.Column(db.String(255), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    answers = db.relationship('Answer', backref='questions', cascade="all, delete-orphan")


    @classmethod
    def create(cls, quiz_id, **kwargs):
        """Create a Question instance with its answers and associate it with a quiz."""
        # Extract answers_data if available
        answers_data = kwargs.pop('answers', [])
        
        # Create the Question instance
        instance = super().create(quiz_id=quiz_id, **kwargs)
        
        # Create associated answers
        for a_data in answers_data:
            Answer.create(question_id=instance.id, **a_data)
        
        instance.save()
        return cls.get(instance.id)
    
    
    
    def get_correct_answer(self):
        """ get the correct answer object for a specific question"""
        return next((answer for answer in self.answers if answer.isCorrect), None)
    
    def to_dict(self):
        """Return a dictionary representation of the Quiz."""
        question_dict = super().to_dict()
        question_dict['answers'] = [answer.to_dict() for answer in self.answers]
        return question_dict