const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    theme TEXT DEFAULT 'light',
    unitSize TEXT DEFAULT '1U'
  )`);
});

module.exports = db;
