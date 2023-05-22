

// SQLite3 Datenbank-Code
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); 

const app = express();
const db = new sqlite3.Database('./my_database.db');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.serialize(function () {
  db.run(
    'CREATE TABLE IF NOT EXISTS chatHistory (id INTEGER PRIMARY KEY, message TEXT, nickname TEXT, createdAt TEXT)'
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS nicknames (id INTEGER PRIMARY KEY, nickname TEXT, createdAt TEXT)'
  );
});

app.post('/chatHistory', function (req, res) {
  const chatMessage = req.body?.message?.toString();
  const nickname = req.body?.nickname?.toString();

  if (!chatMessage || !nickname) {
    res.status(400).send('Both message and nickname are required.');
    return;
  }

  const date = new Date().toISOString();

  const sql = 'INSERT INTO chatHistory(message, nickname, createdAt) VALUES(?, ?, ?)';
  const params = [chatMessage, nickname, date];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).send(err);
      return;
    }

    res.json({ message: 'Chat message added successfully!', id: this.lastID });
  });
});

// Get all messages
app.get('/chatHistory', function (req, res) {
  const sql = 'SELECT * FROM chatHistory';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(rows);
  });
});

// Get all messages by a user
app.get('/chatHistory/:nickname', function (req, res) {
  const sql = 'SELECT * FROM chatHistory WHERE nickname = ?';
  const params = [req.params.nickname];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (rows.length == 0) {
      res.status(404).send(`No messages found for nickname = ${req.params.nickname}`);
      return;
    }
    res.json(rows);
  });
});

app.listen(3000, function () {
  console.log('Node app is running on port', 3000);
});

