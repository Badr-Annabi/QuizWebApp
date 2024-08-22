# from werkzeug.security import generate_password_hash, check_password_hash
from redis_cashing import db
from .encrypte import hash_password, verify_password
from .base import BaseModel
from datetime import datetime


class UserQuiz(BaseModel):
    __tablename__ = 'user_quizzes'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), primary_key=True, nullable=False)
    # question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    
    raw_score = db.Column(db.Integer, nullable=False)
    date_taken = db.Column(db.DateTime, default=datetime.utcnow)


class User(BaseModel):
    __tablename__ = 'users'
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    bio = db.Column(db.String(1024), nullable=True)

    quizzes_created = db.relationship('Quiz', backref='creator', lazy=True)

    quizzes_taken = db.relationship('UserQuiz', backref='user', cascade="all, delete-orphan")


    def __init__(self, *args, **kwargs):
        """ initializes user """
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = hash_password(value)
        super().__setattr__(name, value)

    def check_password(self, password):
        return verify_password(password, self.password)


    def to_dict(self):
       data =  super().to_dict()
       return data