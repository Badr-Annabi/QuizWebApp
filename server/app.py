#!/usr/bin/env python3
from uuid import uuid4
from flask import Flask, request, jsonify, session, abort
from sqlalchemy.orm import joinedload
from config import DevelopmentConfig, TestingConfig
from redis_cashing import db, sessions
from flask_cors import CORS
import os
from models.encrypte import verify_password, hash_password
from models.user import User, UserQuiz
from models.quiz import Quiz
from models.question import Question
from models.user import User
from models.answer import Answer


#######################################################
#                                                     #
#            Methods definition                       #
#                                                     #
#######################################################

def _get_uid():
    """This function generates an uuid"""
    return str(uuid4())

def create_app():
    app = Flask(__name__)

    env = os.getenv('ENV', 'PROD')
    if env == 'test':
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    app.secret_key = os.getenv('SECRET_KEY')

    with app.app_context():
        try:
            from models import user, quiz, question, answer
            db.create_all()
            print("Database tables created successfully.")
        except Exception as e:
            print(f"Error creating database tables: {e}")

    return app

app = create_app()

CORS(app, supports_credentials=True, resources={r"*": {"origins": "*"}})


#######################################################
#                                                     #
#            Authentification routes                  #
#                                                     #
#######################################################

@app.route("/@me")
def check_session():

    session_id = session.get("session_id")
    # print(f"Session ID retrieved in /@me: {session_id}")

    if not session_id:
        print("No session ID found")
        abort(403)

    user_id = sessions.get(session_id)
    if not user_id:
        # print(f"User ID not found for session ID: {session_id}")
        abort(403)

    user = User.query.filter_by(id=user_id).first()
    if not user:
        # print(f"No user found with ID: {user_id}")
        abort(403)

    # print("Session and user found")
    return jsonify({"user": user.to_dict()})


@app.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    email = data.get('email')
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400

    new_user = User.create(**data)
    return jsonify(new_user.to_dict()), 201


@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401
    session_id = _get_uid()
    # print("session_id: {}: #### user_id:{} ".format(session_id, user.id))
    sessions.set(session_id, str(user.id))
    session['session_id'] = session_id
    # print(f"User ID set in session: {session.get('session_id')}")
    return jsonify({'message': 'Login successful'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    session_id = session.get('session_id')
    if session_id:
        sessions.delete_session(session_id)
        session.pop('session_id', None)
        return jsonify({'message': 'Logout successful'}), 200
    else:
        return jsonify({'message': 'No active session'}), 400
    

@app.route('/debug-session')
def debug_session():
    return jsonify({
        'session_data': dict(session)
    })


#######################################################
#                                                     #
#                   CRUD QUIZ                         #
#                                                     #
#######################################################

#           CREATE A NEW QUIZ 

@app.route('/quizzes', methods=['POST'])
def create_quiz():

    session_id = session.get('session_id')
    # print(f"session_id: {session_id}")
    if not session_id:
        abort(403)
    creator_id = sessions.get(session_id)
    if not creator_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    data['creator_id'] = creator_id
    # print(f"data:{data}")
    creator = db.session.get(User, creator_id)

    if not creator:
        return jsonify({'error': 'Creator not found'}), 404
    new_quiz = Quiz.create(**data)

    # print(new_quiz.to_dict())
    return jsonify({'message': 'Quiz created successfully'}), 201

@app.route('/quizzes', methods=['GET'])
def all_quizzes():
    

    quizzes_data = Quiz.query.options(joinedload(Quiz.questions).
                                      joinedload(Question.answers)).all()
    quizzes = [quiz.to_dict() for quiz in quizzes_data]
    return jsonify(quizzes)

@app.route('/quizzes/created', methods=['GET'])
def get_created_quizzes_by_user():
    """ return all quizzes created by user """
    session_id = session.get("session_id")
    print(f"Session ID retrieved in submit: {session_id}")

    if not session_id:
        print("No session ID found")
        abort(403)

    user_id = sessions.get(session_id)  
    if not user_id:
        # print(f"User ID not found for session ID: {session_id}")
        abort(403, description='Invalid session. User not found for the session ID.')
    
    quizzes_data = Quiz.query.options(joinedload(Quiz.questions).
                                      joinedload(Question.answers)).filter_by(creator_id=user_id).all()
    quizzes = [quiz.to_dict() for quiz in quizzes_data]
    return jsonify(quizzes)

@app.route('/quizzes/submitted', methods=['GET'])
def get_submitted_quizzes_by_user():
    """ return all quizzes submitted by user """
    session_id = session.get('session_id')
    if not session_id:
        abort(403, description="Authentication required. No session ID found.")

    user_id = sessions.get(session_id)
    if not user_id:
        abort(403, description="Invalid session. User not found for the session ID.")

    # Query UserQuiz to get all quizzes submitted by the user
    submitted_quizzes_data = UserQuiz.query.filter_by(user_id=user_id).all()
    quiz_ids = [user_quiz.quiz_id for user_quiz in submitted_quizzes_data]

    if not quiz_ids:
        return jsonify({'message': 'No quizzes found for this user'}), 404

    # Query quizzes with eager loading for questions and answers
    quizzes_data = Quiz.query.options(
        joinedload(Quiz.questions).joinedload(Question.answers)
    ).filter(Quiz.id.in_(quiz_ids)).all()

    # Convert quizzes to a dictionary format
    quizzes = [quiz.to_dict() for quiz in quizzes_data]

    return jsonify(quizzes)


@app.route('/quizzes/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):

    session_id = session.get("session_id")
    print(f"Session ID retrieved in submit: {session_id}")

    if not session_id:
        print("No session ID found")
        abort(403)

    user_id = sessions.get(session_id)  
    if not user_id:
        # print(f"User ID not found for session ID: {session_id}")
        abort(403, description='Invalid session. User not found for the session ID.')
        
    # print(quiz_id)
    quiz = Quiz.get(quiz_id)
    if not quiz:
        return jsonify({'error': 'Quiz not found'}), 404

    quiz_dict = {
            "quiz_id": quiz.id,
            "title": quiz.title,
            "description": quiz.description,
            "questions": []
        }
    for question in quiz.questions:
        question_dict = {
        "question_id": question.id,
        "text": question.text,
        "answers": []
        }
        for answer in question.answers:
            question_dict["answers"].append({
                "answer_id": answer.id,
                "text": answer.text
            })
        quiz_dict["questions"].append(question_dict)
    return jsonify(quiz_dict)


@app.route('/quizzes/<quiz_id>/submit', methods=['POST'])
def submit_quiz(quiz_id):


    data = request.get_json()
    session_id = session.get("session_id")
    print(f"Session ID retrieved in submit: {session_id}")

    if not session_id:
        print("No session ID found")
        abort(403)

    user_id = sessions.get(session_id)  
    if not user_id:
        # print(f"User ID not found for session ID: {session_id}")
        abort(403, description='Invalid session. User not found for the session ID.')
    # print(user_id)
    answers = data.get('answers')

    total_score = 0
    quiz = Quiz.get(quiz_id)
    # questions = quiz.questions

    for answer in answers:
        user_answer = answer.get('selectedOption')
        # print(answer)
        print(answer.get('questionId'))
        question = Question.get(answer.get('questionId'))
        print(question)
        correct_answer = question.get_correct_answer().text
        if user_answer == correct_answer:
            total_score += 1
    user_quiz = UserQuiz.query.filter_by(user_id=user_id, quiz_id=quiz_id).first()

    if user_quiz:
        user_quiz.raw_score = total_score
    else:
        user_quiz = UserQuiz(
            user_id=user_id,
            quiz_id=quiz_id,
            raw_score=total_score
        )

    try:
        db.session.add(user_quiz)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error in create_quiz: {e}")
        return jsonify({"error": "An error occurred"}), 500
    return jsonify(user_quiz.to_dict()), 201


@app.route('/quizzes/<quiz_id>', methods=['PUT'])
def update_quiz(quiz_id):

    # Check if user is authenticated
    data = request.get_json()
    session_id = session.get("session_id")
    print(session_id)
    if not session_id:
        abort(403, description="Authentication required. No session ID found.")

    # Get user associated with the session
    logged_in_user_id = sessions.get(session_id)
    if not logged_in_user_id:
        abort(403, description="Invalid session. User not found for the session ID.")

    user = User.query.filter_by(id=logged_in_user_id).first()
    if not user:
        abort(403, description="User not found.")

    # Verify that the user can only update their own quiz
    quiz_gotten = Quiz.get(quiz_id)
    print(f'user id {user.id}')
    print(f'quiz creator id {quiz_gotten.creator_id}')
    if user.id != quiz_gotten.creator_id:
        abort(403, description="You are not authorized to update this quiz.")
    
    
    updated_quiz = Quiz.update(quiz_id, **data)
    print(updated_quiz.to_dict)
    return jsonify({"message": "Quiz updated successfully"}), 200

@app.route('/quizzes/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    # Check if user is authenticated
    session_id = session.get("session_id")
    if not session_id:
        abort(403, description="Authentication required. No session ID found.")

    # Get user associated with the session
    logged_in_user_id = sessions.get(session_id)
    if not logged_in_user_id:
        abort(403, description="Invalid session. User not found for the session ID.")

    user = User.query.filter_by(id=logged_in_user_id).first()
    if not user:
        abort(403, description="User not found.")

    # Verify that the user can only update their own quiz
    quiz_gotten = Quiz.get(quiz_id)
    if not quiz_gotten:
        abort(403, description="Quiz not found")
    if user.id != quiz_gotten.creator_id:
        abort(403, description="You are not authorized to delete this quiz.")
    quiz = Quiz.delete(quiz_id)

    return jsonify({'message': 'Quiz deleted successfully'}), 200


#######################################################
#                                                     #
#                   CRUD ANSWER                       #
#                                                     #
#######################################################

# @app.route('/answers', methods=['POST'])
# def submit_answer():
#     from models.user import User
#     from models.question import Question
#     from models.answer import Answer

#     if 'user_id' not in session:
#         return jsonify({'error': 'Unauthorized'}), 401

#     data = request.get_json()
#     user_id = data.get('user_id')
#     question_id = data.get('question_id')
#     text = data.get('text')
#     is_correct = data.get('is_correct')

#     user = db.session.get(user_id)
#     question = Question.query.get(question_id)
#     if not user or not question:
#         return jsonify({'error': 'User or Question not found'}), 404

#     answer = Answer(text=text, is_correct=is_correct, question_id=question_id, user_id=user_id)
#     db.session.add(answer)
#     db.session.commit()

#     return jsonify(answer.to_dict()), 201



#######################################################
#                                                     #
#                   UPDATE/DELETE USER                #
#                                                     #
#######################################################
@app.route('/users/profile', methods=['PUT'])
def update_user():
    

    # Check if user is authenticated
    session_id = session.get("session_id")
    if not session_id:
        abort(403, description="Authentication required. No session ID found.")

    # Get user associated with the session
    logged_in_user_id = sessions.get(session_id)
    if not logged_in_user_id:
        abort(403, description="Invalid session. User not found for the session ID.")

    user = User.query.filter_by(id=logged_in_user_id).first()
    if not user:
        abort(403, description="User not found.")

    data = request.json
    if 'currentTextPassword' in data and 'newPassword' in data:
         # Check if the current password is correct
        if not user.check_password(data['currentTextPassword']):
            return jsonify({'error': 'Invalid current password'}), 401
        for key, value in data.items():
            if key == 'newPassword':
                # Update the password
                user.password = value
        
    updated_user = User.update(logged_in_user_id, **data)

    print(f'Updated Users password: {updated_user.password}')


    return jsonify({"message": "User updated successfully", "user": user.to_dict()})

@app.route('/users/profile', methods=['DELETE'])
def delete_user():

    # Check if user is authenticated
    session_id = session.get("session_id")
    print(f"Session ID retrieved in submit: {session_id}")
    if not session_id:
        abort(403, description="Authentication required. No session ID found.")

    # Get user associated with the session
    logged_in_user_id = sessions.get(session_id)
    if not logged_in_user_id:
        abort(403, description="Invalid session. User not found for the session ID.")

    user = User.query.filter_by(id=logged_in_user_id).first()
    if not user:
        abort(403, description="User not found.")


    # Delete the user
    User.delete(logged_in_user_id)

    return jsonify({"message": "User deleted successfully"})

   
#######################################################
#                                                     #
#                  OTHERS                             #
#                                                     #
#######################################################

# GET RESULTS OF LOGGED IN USER FOR A SPECIFIC QUIZ BY quiz_id
@app.route('/users/<quiz_id>/result', methods=['GET'])
def get_user_result(quiz_id):
    total_score = 0
    session_id = session.get("session_id")
    user_id = sessions.get(session_id)

    if not user_id:
        return jsonify({"error": "User not authenticated"}), 403

    user_quiz = UserQuiz.query.filter_by(user_id=user_id, quiz_id=quiz_id).first()
    quiz = Quiz.query.get(quiz_id)
    
    if not user_quiz:
        return jsonify({"error": "User has not taken the quiz"}), 404

    score = user_quiz.raw_score
    date_taken = user_quiz.date_taken
    result_data = {
    "quiz_title": quiz.title,
    "raw_score": score,
    "total_questions": len(quiz.questions),
    "date_taken": user_quiz.date_taken
    }
    return jsonify(result_data), 200


# MAIN 
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
