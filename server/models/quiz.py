from models.base import BaseModel
from models.question import Question
from models.answer import Answer
from redis_cashing import db


class Quiz(BaseModel):
    __tablename__ = 'quizzes'
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    level = db.Column(db.String(10), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    questions = db.relationship('Question', backref='quiz', cascade="all, delete-orphan")

    taken_by_users = db.relationship('UserQuiz', backref='quiz', cascade="all, delete-orphan")

    @classmethod
    def create(cls, *args, **kwargs):
        """Quiz create method"""
        instance = super().create(**{k: v for k, v in kwargs.items() if k != 'questions'})
        if instance and 'questions' in kwargs:
            questions_data = kwargs['questions']
            for q_data in questions_data:
                # print(q_data)
                Question.create(quiz_id=instance.id, **q_data)
        
        instance.save()
        return cls.get(instance.id)

        
    @classmethod
    def update(cls, id, **kwargs):
        instance = super().update(id, **{k: v for k, v in kwargs.items() if k != 'questions' and k != 'creator_id'})
        
        if instance and 'questions' in kwargs:
            questions_data = kwargs['questions']

            # Clear existing questions and answers
            instance.questions.clear()

            # Add the new set of questions and answers
            for q_data in questions_data:
                question = Question(text=q_data['text'])
                instance.questions.append(question)

                answers_data = q_data['answers']
                # correct_answer = q_data['isCorrect']

                for a_data in answers_data:
                    answer = Answer(
                        text=a_data['text'],
                        isCorrect=(a_data['isCorrect']),
                        question_id=question.id
                    )
                    question.answers.append(answer)

            try:
                db.session.commit()
            except Exception as e:
                print(e)

        instance = cls.query.get(id)  # Get the updated instance from the database
        return instance
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



