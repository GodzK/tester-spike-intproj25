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
      console.error("retrying in 5 seconds");
      console.error(err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to database 'mydb'");

      app.get("/", (req, res) => res.send("Backend is running successfully!"));

      app.get("/study-plans", (req, res) => {
        db.query("SELECT * FROM study_plan", (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(results);
        });
      });

      app.get("/student-plans", (req, res) => {
        db.query("SELECT * FROM students_plans", (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
      });

    }
  });
}

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

