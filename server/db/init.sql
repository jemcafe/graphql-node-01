-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

DROP TABLE IF EXISTS Books, Authors;

CREATE TABLE Books (
   id SERIAL PRIMARY KEY,
   title VARCHAR(40) NOT NULL,
   genre VARCHAR(30) NOT NULL,
   author_id INTEGER
);

CREATE TABLE Authors (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   age INTEGER NOT NULL
);