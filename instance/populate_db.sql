-- SQLite dump file

-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS user_quizzes;

-- Create tables
CREATE TABLE users (
    email VARCHAR(120) NOT NULL, 
    password VARCHAR(200) NOT NULL, 
    firstName VARCHAR(80) NOT NULL, 
    lastName VARCHAR(80) NOT NULL, 
    bio VARCHAR(1024), 
    id VARCHAR(60) NOT NULL, 
    created_at DATETIME, 
    updated_at DATETIME, 
    PRIMARY KEY (id), 
    UNIQUE (email)
);

CREATE TABLE quizzes (
    title VARCHAR(100) NOT NULL, 
    description VARCHAR(255), 
    level VARCHAR(10) NOT NULL, 
    creator_id VARCHAR(60) NOT NULL, 
    id VARCHAR(60) NOT NULL, 
    created_at DATETIME, 
    updated_at DATETIME, 
    PRIMARY KEY (id), 
    FOREIGN KEY(creator_id) REFERENCES users (id)
);

CREATE TABLE user_quizzes (
    user_id VARCHAR(60) NOT NULL, 
    quiz_id VARCHAR(60) NOT NULL, 
    raw_score INTEGER NOT NULL, 
    date_taken DATETIME, 
    id VARCHAR(60) NOT NULL, 
    created_at DATETIME, 
    updated_at DATETIME, 
    PRIMARY KEY (user_id, quiz_id, id), 
    FOREIGN KEY(user_id) REFERENCES users (id), 
    FOREIGN KEY(quiz_id) REFERENCES quizzes (id)
);

CREATE TABLE questions (
    text VARCHAR(255) NOT NULL, 
    quiz_id VARCHAR(60) NOT NULL, 
    id VARCHAR(60) NOT NULL, 
    created_at DATETIME, 
    updated_at DATETIME, 
    PRIMARY KEY (id), 
    FOREIGN KEY(quiz_id) REFERENCES quizzes (id)
);

CREATE TABLE answers (
    text VARCHAR(255) NOT NULL, 
    isCorrect BOOLEAN NOT NULL, 
    question_id VARCHAR(60) NOT NULL, 
    id VARCHAR(60) NOT NULL, 
    created_at DATETIME, 
    updated_at DATETIME, 
    PRIMARY KEY (id), 
    FOREIGN KEY(question_id) REFERENCES questions (id)
);

-- Insert sample data into users
INSERT INTO users (email, password, firstName, lastName, bio, id, created_at, updated_at)
VALUES
('john.doe@example.com', 'hashed_password_1', 'John', 'Doe', 'Avid quiz taker.', 'user1', '2024-08-25 10:00:00', '2024-08-25 10:00:00'),
('jane.smith@example.com', 'hashed_password_2', 'Jane', 'Smith', 'Quiz creator and enthusiast.', 'user2', '2024-08-25 11:00:00', '2024-08-25 11:00:00');

-- Insert sample data into quizzes
INSERT INTO quizzes (title, description, level, creator_id, id, created_at, updated_at)
VALUES
('General Knowledge Quiz', 'A quiz to test general knowledge.', 'easy', 'user2', 'quiz1', '2024-08-25 12:00:00', '2024-08-25 12:00:00'),
('Science Quiz', 'A challenging quiz on science topics.', 'medium', 'user2', 'quiz2', '2024-08-25 13:00:00', '2024-08-25 13:00:00'),
('History Quiz', 'Test your knowledge of historical events.', 'hard', 'user2', 'quiz3', '2024-08-25 14:00:00', '2024-08-25 14:00:00'),
('Geography Quiz', 'Questions about countries, cities, and landmarks.', 'easy', 'user2', 'quiz4', '2024-08-25 15:00:00', '2024-08-25 15:00:00'),
('Math Quiz', 'Solve math problems and equations.', 'medium', 'user2', 'quiz5', '2024-08-25 16:00:00', '2024-08-25 16:00:00'),
('Literature Quiz', 'Questions about famous books and authors.', 'medium', 'user2', 'quiz6', '2024-08-25 17:00:00', '2024-08-25 17:00:00'),
('Art Quiz', 'Explore the world of art and artists.', 'hard', 'user2', 'quiz7', '2024-08-25 18:00:00', '2024-08-25 18:00:00'),
('Technology Quiz', 'Test your knowledge of modern technology.', 'easy', 'user2', 'quiz8', '2024-08-25 19:00:00', '2024-08-25 19:00:00'),
('Music Quiz', 'Questions about music genres and artists.', 'medium', 'user2', 'quiz9', '2024-08-25 20:00:00', '2024-08-25 20:00:00'),
('Sports Quiz', 'Questions about various sports and athletes.', 'hard', 'user2', 'quiz10', '2024-08-25 21:00:00', '2024-08-25 21:00:00');

-- Insert sample data into questions
INSERT INTO questions (text, quiz_id, id, created_at, updated_at)
VALUES
('What is the capital of France?', 'quiz1', 'question1', '2024-08-25 22:00:00', '2024-08-25 22:00:00'),
('What is the chemical symbol for water?', 'quiz2', 'question2', '2024-08-25 23:00:00', '2024-08-25 23:00:00'),
('Who was the first President of the United States?', 'quiz3', 'question3', '2024-08-26 00:00:00', '2024-08-26 00:00:00'),
('Which river is the longest in the world?', 'quiz4', 'question4', '2024-08-26 01:00:00', '2024-08-26 01:00:00'),
('What is the square root of 144?', 'quiz5', 'question5', '2024-08-26 02:00:00', '2024-08-26 02:00:00'),
('Who wrote "To Kill a Mockingbird"?', 'quiz6', 'question6', '2024-08-26 03:00:00', '2024-08-26 03:00:00'),
('What famous painting is also known as "La Gioconda"?', 'quiz7', 'question7', '2024-08-26 04:00:00', '2024-08-26 04:00:00'),
('What year was the World Wide Web invented?', 'quiz8', 'question8', '2024-08-26 05:00:00', '2024-08-26 05:00:00'),
('Which artist is known for the album "Thriller"?', 'quiz9', 'question9', '2024-08-26 06:00:00', '2024-08-26 06:00:00'),
('In which year did the Olympics first include women s events?', 'quiz10', 'question10', '2024-08-26 07:00:00', '2024-08-26 07:00:00');

-- Insert sample data into answers

INSERT INTO answers (text, isCorrect, question_id, id, created_at, updated_at)
VALUES
('Paris', 1, 'question1', 'answer1', '2024-08-26 08:00:00', '2024-08-26 08:00:00'),
('London', 0, 'question1', 'answer2', '2024-08-26 09:00:00', '2024-08-26 09:00:00'),
('H2O', 1, 'question2', 'answer3', '2024-08-26 10:00:00', '2024-08-26 10:00:00'),
('O2', 0, 'question2', 'answer4', '2024-08-26 11:00:00', '2024-08-26 11:00:00'),
('George Washington', 1, 'question3', 'answer5', '2024-08-26 12:00:00', '2024-08-26 12:00:00'),
('Abraham Lincoln', 0, 'question3', 'answer6', '2024-08-26 13:00:00', '2024-08-26 13:00:00'),
('Nile', 1, 'question4', 'answer7', '2024-08-26 14:00:00', '2024-08-26 14:00:00'),
('Amazon', 0, 'question4', 'answer8', '2024-08-26 15:00:00', '2024-08-26 15:00:00'),
('12', 1, 'question5', 'answer9', '2024-08-26 16:00:00', '2024-08-26 16:00:00'),
('10', 0, 'question5', 'answer10', '2024-08-26 17:00:00', '2024-08-26 17:00:00'),
('Harper Lee', 1, 'question6', 'answer11', '2024-08-26 18:00:00', '2024-08-26 18:00:00'),
('Mark Twain', 0, 'question6', 'answer12', '2024-08-26 19:00:00', '2024-08-26 19:00:00'),
('Mona Lisa', 1, 'question7', 'answer13', '2024-08-26 20:00:00', '2024-08-26 20:00:00'),
('Starry Night', 0, 'question7', 'answer14', '2024-08-26 21:00:00', '2024-08-26 21:00:00'),
('1989', 1, 'question8', 'answer15', '2024-08-26 22:00:00', '2024-08-26 22:00:00'),
('1991', 0, 'question8', 'answer16', '2024-08-26 23:00:00', '2024-08-26 23:00:00'),
('Michael Jackson', 1, 'question9', 'answer17', '2024-08-27 00:00:00', '2024-08-27 00:00:00'),
('Elton John', 0, 'question9', 'answer18', '2024-08-27 01:00:00', '2024-08-27 01:00:00'),
('1900', 1, 'question10', 'answer19', '2024-08-27 02:00:00', '2024-08-27 02:00:00'),
('1920', 0, 'question10', 'answer20', '2024-08-27 03:00:00', '2024-08-27 03:00:00');

-- Insert sample data into user_quizzes
INSERT INTO user_quizzes (user_id, quiz_id, raw_score, date_taken, id, created_at, updated_at)
VALUES
('user1', 'quiz1', 5, '2024-08-25 20:00:00', 'userquiz1', '2024-08-25 20:00:00', '2024-08-25 20:00:00'),
('user1', 'quiz2', 3, '2024-08-25 21:00:00', 'userquiz2', '2024-08-25 21:00:00', '2024-08-25 21:00:00'),
('user1', 'quiz3', 4, '2024-08-25 22:00:00', 'userquiz3', '2024-08-25 22:00:00', '2024-08-25 22:00:00'),
('user1', 'quiz4', 2, '2024-08-25 23:00:00', 'userquiz4', '2024-08-25 23:00:00', '2024-08-25 23:00:00'),
('user2', 'quiz5', 7, '2024-08-26 00:00:00', 'userquiz5', '2024-08-26 00:00:00', '2024-08-26 00:00:00'),
('user2', 'quiz6', 6, '2024-08-26 01:00:00', 'userquiz6', '2024-08-26 01:00:00', '2024-08-26 01:00:00'),
('user2', 'quiz7', 5, '2024-08-26 02:00:00', 'userquiz7', '2024-08-26 02:00:00', '2024-08-26 02:00:00'),
('user2', 'quiz8', 8, '2024-08-26 03:00:00', 'userquiz8', '2024-08-26 03:00:00', '2024-08-26 03:00:00'),
('user2', 'quiz9', 7, '2024-08-26 04:00:00', 'userquiz9', '2024-08-26 04:00:00', '2024-08-26 04:00:00'),
('user2', 'quiz10', 9, '2024-08-26 05:00:00', 'userquiz10', '2024-08-26 05:00:00', '2024-08-26 05:00:00');
