const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

function connectWithRetry() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "pl1password",
    database: process.env.DB_NAME || "mydb",
  });

  db.connect(err => {
    if (err) {
      console.error("Database connection failed, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to database");

      app.get("/", (req, res) => res.send("Backend is running successfully!"));

      app.get("/students", (req, res) => {
        db.query("SELECT * FROM students", (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(results);
        });
      });

      app.post("/students", (req, res) => {
        const { name, email } = req.body;
        if (!name || !email)
          return res.status(400).json({ error: "Please provide name and email" });

        db.query(
          "INSERT INTO students (name, email) VALUES (?, ?)",
          [name, email],
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Student added successfully", id: result.insertId });
          }
        );
      });
    }
  });
}

connectWithRetry();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
