const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "pl1password",
  database: process.env.DB_NAME || "mydb",
  charset: 'utf8mb4'
});

function connectWithRetry() {
  db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err.message);
    setTimeout(connectWithRetry, 5000);
  } else {
    console.log("Connected to database 'mydb'");
    db.query("SET NAMES utf8mb4");
  }
});

}
connectWithRetry();

app.get("/", (req, res) => res.send("Backend is running!"));

app.get("/study-plans", (req, res) => {
  db.query("SELECT * FROM study_plan", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); 
    res.json(results); // ส่ง JSON ออกไป
  });
});

app.get("/student-plans", (req, res) => {
  db.query("SELECT * FROM students_plans", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/student-plans", (req, res) => {
  const { student_id, plan_id } = req.body;
  if (!student_id || !plan_id) {
    return res.status(400).json({ error: "Missing student_id or plan_id" });
  }

  const query = "INSERT INTO students_plans (student_id, plan_id) VALUES (?, ?)";
  db.query(query, [student_id, plan_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Student plan added successfully", id: results.insertId });
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
