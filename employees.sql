CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    EMAIL TEXT UNIQUE,
    department TEXT
);