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
  charset: 'utf8mb4'
};

let db;

function connectWithRetry() {
  console.log("Attempting database connection...");
  db = mysql.createConnection(dbConfig);
  
  db.connect(err => {
    if (err) {
      console.error("Database connection failed:", err.message);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000); // ลองใหม่, แต่ไม่ Crash
      return; // ออกจากฟังก์ชันนี้ก่อน
    } 
    
    // ⭐ 1. ย้าย app.listen() มาไว้ที่นี่ ⭐
    // เซิร์ฟเวอร์จะเริ่มทำงาน "หลังจาก" เชื่อมต่อ DB สำเร็จแล้วเท่านั้น
    console.log("Connected to database 'mydb'");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  db.on('error', function(err) {
    console.error('Database error:', err);
    
    // ⭐ 2. แก้ไขจุดที่ทำให้ Crash (line 39) ⭐
    // เราจะจัดการเฉพาะถ้าการเชื่อมต่อ 'หลุด' (หลังจากต่อติดแล้ว)
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      console.log("Connection lost. Reconnecting...");
      connectWithRetry(); 
    }
    // เราลบ 'else { throw err; }' ทิ้งไป
    // เพราะ Error ตอนเชื่อมต่อครั้งแรก (ECONNREFUSED)
    // จะถูกจัดการโดย db.connect() ด้านบนอยู่แล้ว
  });
}

// เริ่มกระบวนการเชื่อมต่อ (และจะเริ่มเซิร์ฟเวอร์เมื่อพร้อม)
connectWithRetry();

// --- Routes ---

app.get("/", (req, res) => res.send("Backend is running!"));

app.get("/study-plans", (req, res) => {
  // ถ้าโค้ดมาถึงนี่ได้ แปลว่า 'db' พร้อมใช้งานแล้ว
  db.query("SELECT * FROM study_plan", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); 
    res.json(results);
  });
});