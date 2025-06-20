CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    department TEXT
);