#!/usr/bin/env python3
from flask import Flask, request, jsonify, session
# from werkzeug.security import generate_password_hash, check_password_hash
from config import DevelopmentConfig, TestingConfig
from db import db
import os
from models.encrypte import verify_password, hash_password

def create_app():
    app = Flask(__name__)

    env = os.getenv('ENV', 'PROD')
    if env == 'test':
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    app.secret_key = os.getenv('SECRET_KEY', 'defaultsecret')

    with app.app_context():
        from models import user, quiz, question, answer
        db.create_all()

    return app

app = create_app()

@app.route('/signup', methods=['POST'])
def signup():
    from models.user import User

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400

    # hashed_password = generate_password_hash(password, method='bcrypt')
    new_user = User(email=email, password=password, first_name=first_name, last_name=last_name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@app.route('/login', methods=['POST'])
def login():
    from models.user import User

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    # if not user or not check_password_hash(user.password, password):
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401

    session['user_id'] = user.id
    return jsonify({'message': 'Login successful'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/quizzes', methods=['POST'])
def create_quiz():
    from models.user import User
    from models.quiz import Quiz
    from models.question import Question

    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    creator_id = data.get('creator_id')
    title = data.get('title')
    questions_data = data.get('questions', [])

    creator = User.query.get(creator_id)
    if not creator:
        return jsonify({'error': 'Creator not found'}), 404

    new_quiz = Quiz(title=title, creator=creator)
    for q_data in questions_data:
        question = Question(text=q_data['text'])
        new_quiz.questions.append(question)
    db.session.add(new_quiz)
    db.session.commit()

    return jsonify(new_quiz.to_dict()), 201

@app.route('/answers', methods=['POST'])
def submit_answer():
    from models.user import User
    from models.question import Question
    from models.answer import Answer

    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    student_id = data.get('student_id')
    question_id = data.get('question_id')
    text = data.get('text')
    is_correct = data.get('is_correct')

    student = User.query.get(student_id)
    question = Question.query.get(question_id)
    if not student or not question:
        return jsonify({'error': 'User or Question not found'}), 404

    answer = Answer(text=text, is_correct=is_correct, question=question, student=student)
    db.session.add(answer)
    db.session.commit()

    return jsonify(answer.to_dict()), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
