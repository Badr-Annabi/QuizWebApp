from models.user import User
from sqlalchemy import Column
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Table, ForeignKey
from models.answers import Answer  # Import Answer class if needed


class Student(User):
    """ Student Class definition """
    __tablename__ = 'students'

    answers = relationship('Answer', back_populates='student')

    def __init__(self, *args, **kwargs):
        """ initializes question """
        super().__init__(*args, **kwargs)


    def answer_question(self, question_id, text, is_correct):
        """Method for a student to answer a question"""
        answer = Answer(text=text, is_correct=is_correct, question_id=question_id)
        # Add answer to storage and save
        self.answers.append(answer)
    
        return answer
