CREATE DATABASE IF NOT EXISTS mydb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mydb;

CREATE TABLE IF NOT EXISTS study_plan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_code CHAR(2) NOT NULL UNIQUE,
  name_eng VARCHAR(60) NOT NULL,
  name_th VARCHAR(100) NOT NULL
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS students_plans (
  student_id VARCHAR(11) PRIMARY KEY,
  plan_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES study_plan(id)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO study_plan (plan_code, name_eng, name_th) VALUES
('FE', 'Frontend Developer', 'นักพัฒนาฟรอนเอนด์'),
('BE', 'Backend Developer', 'นักพัฒนาแบ็กเอนด์'),
('FS', 'Full-Stack Developer', 'นักพัฒนาฟูลสแต็ก'),
('AI', 'AI Engineer', 'วิศวกรปัญญาประดิษฐ์'),
('UX', 'UI/UX Designer', 'นักออกแบบ UI/UX'),
('DA', 'Data Analyst', 'นักวิเคราะห์ข้อมูล');
