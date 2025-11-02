const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "pl1password",
  database: process.env.DB_NAME || "mydb",
  charset: "utf8mb4"
};

// Retry function
async function connectWithRetry(retries = 20, delay = 2000) {
  while (retries > 0) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      console.log("Connected to MySQL");
      return connection;
    } catch (err) {
      console.log("Waiting for DB, retrying...", retries);
      retries--;
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error("Could not connect to MySQL");
}

let connection;
connectWithRetry().then(conn => connection = conn);

// API endpoint
app.get("/intproj25/PL-1/api/study-plans", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM study_plan");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend listening on port 3000"));
