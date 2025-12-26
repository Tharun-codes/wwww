const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ================================
   FRONTEND PATH (FIXED)
================================ */
const FRONTEND_PATH = path.join(__dirname, "../frontend");

/* ================================
   IN-MEMORY DATA (PHASE 3)
================================ */
let leads = [];
let lastLoanNumber = 0;
let lastYearMonth = "";

/* ================================
   LOAN ID GENERATOR
   Format: YYYYMM01, YYYYMM02...
================================ */
function generateLoanId() {
  const now = new Date();
  const yearMonth =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0");

  if (lastYearMonth !== yearMonth) {
    lastLoanNumber = 0;
    lastYearMonth = yearMonth;
  }

  lastLoanNumber += 1;
  return `${yearMonth}${String(lastLoanNumber).padStart(2, "0")}`;
}

/* ================================
   SERVE STATIC FILES
================================ */
app.use(express.static(FRONTEND_PATH));

/* ================================
   PAGE ROUTES (EXPLICIT & SAFE)
================================ */
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "dashboard.html"));
});

app.get("/new-lead.html", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "new-lead.html"));
});

app.get("/view-cases.html", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "view-cases.html"));
});

/* ================================
   LOGIN API
================================ */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "1234") {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false });
});

/* ================================
   LEADS API (PHASE 3)
================================ */
app.post("/api/leads", (req, res) => {
  console.log("NEW LEAD:", req.body);

  const loanId = generateLoanId();

  const lead = {
    loanId,
    dateTime: new Date().toLocaleString(),
    ...req.body
  };

  leads.unshift(lead);
  res.json({ success: true, lead });
});

app.get("/api/leads", (req, res) => {
  res.json(leads);
});

app.get("/api/leads/:index", (req, res) => {
  const index = Number(req.params.index);
  if (!leads[index]) {
    return res.status(404).json({ success: false });
  }
  res.json(leads[index]);
});

app.put("/api/leads/:index", (req, res) => {
  const index = Number(req.params.index);
  if (!leads[index]) {
    return res.status(404).json({ success: false });
  }
  leads[index] = { ...leads[index], ...req.body };
  res.json({ success: true });
});

/* ================================
   START SERVER
================================ */
app.listen(3000, () => {
  console.log("🚀 WheelsWeb running at http://localhost:3000");
});