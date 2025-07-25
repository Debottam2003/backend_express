-- Active: 1732826327969@@127.0.0.1@3000@student@public
CREATE TABLE todo(
id SERIAL PRIMARY KEY,
todo_name TEXT
);

INSERT INTO todo(todo_name) VALUES('have to learn coding');

INSERT INTO todo(todo_name) VALUES('have to study');

INSERT INTO todo(todo_name) 
VALUES('have to study'),
('LISTEN MUSIC'),
('PLAYING COC'),
('DOING JAVA'),
('DOING JAVASCRIPT');