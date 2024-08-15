from flask import Flask, request, jsonify
from config import DevelopmentConfig, TestingConfig
from db import db
import os


def create_app():
    app = Flask(__name__)

    env = os.getenv('ENV', 'PROD')
    if env == 'test':
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    db.init_app(app)

    with app.app_context():
        from models import user, quiz, question, answer
        db.create_all()

    return app

app = create_app()

@app.route('/quizzes', methods=['POST'])
def create_quiz():
    from models.user import User
    from models.quiz import Quiz
    from models.question import Question

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
    app.run(debug=True)
