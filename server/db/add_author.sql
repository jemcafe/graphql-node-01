INSERT INTO Author
(name, age)
VALUES
($1, $2)
RETURNING *;