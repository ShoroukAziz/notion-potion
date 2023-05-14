// Import the SQLite3 library and instantiate a new database connection

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./notion.sqlite');

module.exports = db;
