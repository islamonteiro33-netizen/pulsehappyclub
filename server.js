const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3010;

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || bcrypt.hashSync("123456", 10);
const dataPath = path.join(__dirname, "data", "site.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "troque-essa-chave-pulsehappyclub",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
}

function requireLogin(req, res, next) {
  if (req.session && req.session.logged) return next();
  return res.redirect("/admin/login");
}

app.get("/api/site", (req, res) => res.json(readData()));

app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/admin/login", (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === ADMIN_USER && bcrypt.compareSync(senha, ADMIN_PASS_HASH)) {
    req.session.logged = true;
    return res.redirect("/admin");
  }
  return res.redirect("/admin/login?erro=1");
});

app.get("/admin/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/admin/login"));
});

app.get("/admin", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

app.get("/admin/data", requireLogin, (req, res) => res.json(readData()));

app.post("/admin/save", requireLogin, (req, res) => {
  saveData(req.body);
  res.json({ success: true });
});

app.listen(PORT, () => console.log("Pulse Happy Club rodando na porta " + PORT));
