CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

INSERT INTO students (name, email) VALUES
('Alice', 'alice@email.com'),
('Bob', 'bob@email.com');


-- docker-compose down -v เพื่อลบ volume เเละ compose up เพื่อ สร้างdbใหม่
