CREATE DATABASE db_nunes;
USE db_nunes;

CREATE TABLE products (
    id INT PRIMARY KEY auto_increment,
    code VARCHAR (20),
    name VARCHAR(120),
    description VARCHAR(200),
    price DECIMAL (8, 2)
);