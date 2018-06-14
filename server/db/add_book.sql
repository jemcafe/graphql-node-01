INSERT INTO Books
(name, genre, author_id)
VALUES
($1, $2, $3)
RETURNING *;