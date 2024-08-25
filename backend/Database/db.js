const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "database.db");

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error("Error opening database:", err.message);
          reject(err);
        } else {
          console.log("Connected to the SQLite3 database.");
          resolve(db);
        }
      }
    );
  });
};

module.exports = connectToDatabase;
