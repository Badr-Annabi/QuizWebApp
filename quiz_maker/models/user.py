# from werkzeug.security import generate_password_hash, check_password_hash
from db import db
from .encrypte import hash_password, verify_password

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)

    def __init__(self, email, password, first_name, last_name):
        self.email = email
        # self.password = generate_password_hash(password, method='sha256')
        self.password = hash_password(password)
        self.first_name = first_name
        self.last_name = last_name

    def check_password(self, password):
        # return check_password_hash(self.password, password)
        return verify_password(password, self.password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
