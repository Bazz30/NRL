const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, '../src/data');

// Helper to serve a JSON file
function serveJson(res, fileName) {
  const filePath = path.join(dataDir, fileName);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${fileName}:`, err);
      res.status(404).json({ error: `File not found: ${fileName}` });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
}

// Serve players.json
app.get('/api/players', (req, res) => {
  serveJson(res, 'players.json');
});

// Serve rounds.json
app.get('/api/rounds', (req, res) => {
  serveJson(res, 'rounds.json');
});

// Serve ladder.json
app.get('/api/ladder', (req, res) => {
  serveJson(res, 'ladder.json');
});

// Serve squads.json
app.get('/api/squads', (req, res) => {
  serveJson(res, 'squads.json');
});

// Serve coachPlayers.json
app.get('/api/coach-players', (req, res) => {
  serveJson(res, 'coachPlayers.json');
});

// Serve CurrentRoundStats.json
app.get('/api/current-round-stats', (req, res) => {
  serveJson(res, 'CurrentRoundStats.json');
});

// Serve stats for a specific round (for now, just return CurrentRoundStats.json)
app.get('/api/stats/:round', (req, res) => {
  // In the future, you can add per-round files if you save them
  serveJson(res, 'CurrentRoundStats.json');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
