CREATE TABLE users (
	email VARCHAR(120) NOT NULL, 
	password VARCHAR(200) NOT NULL, 
	"firstName" VARCHAR(80) NOT NULL, 
	"lastName" VARCHAR(80) NOT NULL, 
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
	creator_id INTEGER NOT NULL, 
	id VARCHAR(60) NOT NULL, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(creator_id) REFERENCES users (id)
);
CREATE TABLE user_quizzes (
	user_id INTEGER NOT NULL, 
	quiz_id INTEGER NOT NULL, 
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
	quiz_id INTEGER NOT NULL, 
	id VARCHAR(60) NOT NULL, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(quiz_id) REFERENCES quizzes (id)
);
CREATE TABLE answers (
	text VARCHAR(255) NOT NULL, 
	"isCorrect" BOOLEAN NOT NULL, 
	question_id INTEGER NOT NULL, 
	id VARCHAR(60) NOT NULL, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(question_id) REFERENCES questions (id)
);
