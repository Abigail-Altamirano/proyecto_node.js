CREATE DATABASE Prueba01;

USE Prueba01;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT
);
SELECT * FROM personas;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
SHOW TABLES;

-- Modificar la tabla personas para agregar una columna user_id
ALTER TABLE personas ADD COLUMN user_id INT NOT NULL;

-- Establecer la clave foránea entre personas.user_id y users.id

ALTER TABLE personas 
ADD CONSTRAINT fk_user 
FOREIGN KEY (user_id) REFERENCES users(id) 
ON DELETE CASCADE;

-- Consultar las tablas para verificar la relación
SELECT * FROM personas;
SELECT * FROM users;


