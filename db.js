// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize the database connection
const db = new sqlite3.Database(path.join(__dirname, 'your-database.db'), (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = db; // Export the db object for use in other files
