const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* 🔓 Serve frontend files */
app.use(express.static(path.join(__dirname, "../frontend")));

/* 🏠 Default route → Login page */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* 🔐 Login API */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "1234") {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
});

/* 🚀 Start server */
app.listen(3000, () => {
  console.log("🚀 WheelsWeb running at http://localhost:3000");
});
