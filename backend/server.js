const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "pl1password",
  database: process.env.DB_NAME || "mydb",
  charset: 'utf8mb4' // <--- จุดสำคัญที่ 1: กำหนด charset ที่นี่
};

let db;

function connectWithRetry() {
  db = mysql.createConnection(dbConfig);
  
  db.connect(err => {
    if (err) {
      console.error("Database connection failed:", err.message);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to database 'mydb'");
    }
  });

  db.on('error', function(err) {
    console.error('Database error:', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectWithRetry(); // Re-establish connection on loss
    } else {
      throw err;
    }
  });
}

connectWithRetry();

app.get("/", (req, res) => res.send("Backend is running!"));

app.get("/study-plans", (req, res) => {
  db.query("SELECT * FROM study_plan", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // <--- จุดสำคัญที่ 2: ตั้งค่า Header ให้เป็น utf-8
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); 
    res.json(results);
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});