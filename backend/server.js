const express = require("express");
const mysql = require("mysql2");
const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

app.get("/api/study-plans", (req, res) => {
  db.query("SELECT * FROM study_plans", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(rows);
  });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
