import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("./data/campus.db");

console.log("Database connected");

app.get("/", (req, res) => {
  res.json({
    message: "Campus Disaster Response API is running"
  });
});

app.get("/api/incidents", (req, res) => {
  const incidents = db
    .prepare("SELECT * FROM incidents ORDER BY created_at DESC")
    .all();

  res.json(incidents);
});

app.post("/api/incidents", (req, res) => {
  const {
    title,
    description,
    latitude,
    longitude,
    severity
  } = req.body;

  const result = db
    .prepare(`
      INSERT INTO incidents
      (title, description, latitude, longitude, severity)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      title,
      description,
      latitude,
      longitude,
      severity
    );

  res.json({
    message: "Incident created",
    id: result.lastInsertRowid
  });
});

app.delete("/api/incidents/:id", (req, res) => {
  const { id } = req.params;

  const result = db
    .prepare("DELETE FROM incidents WHERE id = ?")
    .run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Incident not found"
    });
  }

  res.json({
    message: "Incident deleted"
  });
});

app.get("/api/sos", (req, res) => {
  const alerts = db
    .prepare("SELECT * FROM sos_alerts ORDER BY created_at DESC")
    .all();

  res.json(alerts);
});

app.post("/api/sos", (req, res) => {
  const {
    user_id,
    latitude,
    longitude,
    message
  } = req.body;

  const result = db
    .prepare(`
      INSERT INTO sos_alerts
      (user_id, latitude, longitude, message)
      VALUES (?, ?, ?, ?)
    `)
    .run(
      user_id,
      latitude,
      longitude,
      message
    );

  res.status(201).json({
    message: "SOS alert created",
    id: result.lastInsertRowid
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
