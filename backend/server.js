const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

// ตั้งค่าการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "pl1password",
  database: process.env.DB_NAME || "mydb",
});

// Retry เชื่อมต่อถ้า MySQL ยังไม่พร้อม
function connectWithRetry() {
  db.connect(err => {
    if (err) {
      console.error("Database connection failed:", err.message);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to database 'mydb'");
    }
  });
}
connectWithRetry();

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

// Route ดึงข้อมูล study_plan
app.get("/study-plans", (req, res) => {
  db.query("SELECT * FROM study_plan", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Route ดึงข้อมูล students_plans
app.get("/student-plans", (req, res) => {
  db.query("SELECT * FROM students_plans", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// เพิ่ม student-plan ใหม่
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

// Server listen
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
