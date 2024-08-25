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
    creator_id VARCHAR(60) NOT NULL, -- Adjusted to match user ID type
    id VARCHAR(60) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE user_quizzes (
    user_id VARCHAR(60) NOT NULL, -- Adjusted to match user ID type
    quiz_id VARCHAR(60) NOT NULL, -- Adjusted to match quiz ID type
    raw_score INTEGER NOT NULL,
    date_taken DATETIME,
    id VARCHAR(60) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (user_id, quiz_id, id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    ON DELETE CASCADE
);

CREATE TABLE questions (
    text VARCHAR(255) NOT NULL,
    quiz_id VARCHAR(60) NOT NULL, -- Adjusted to match quiz ID type
    id VARCHAR(60) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    ON DELETE CASCADE
);

CREATE TABLE answers (
    text VARCHAR(255) NOT NULL,
    isCorrect BOOLEAN NOT NULL, -- MySQL supports BOOLEAN as TINYINT(1)
    question_id VARCHAR(60) NOT NULL, -- Adjusted to match question ID type
    id VARCHAR(60) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
    ON DELETE CASCADE
);
