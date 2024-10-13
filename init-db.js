const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ctf.db');

db.serialize(() => {
    // Create the flags table if it doesn't already exist
    db.run(`CREATE TABLE IF NOT EXISTS flags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        flag TEXT NOT NULL
    )`);

    // Insert initial flags if the table is empty
    db.get("SELECT COUNT(*) as count FROM flags", (err, row) => {
        if (err) {
            console.error("Error counting flags:", err);
            return;
        }
        
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO flags (flag) VALUES (?)");
            stmt.run('flag{first_flag}');
            stmt.run('flag{second_flag}');
            stmt.run('flag{third_flag}');
            stmt.run('flag{final_flag}');
            stmt.finalize((err) => {
                if (err) {
                    console.error("Error finalizing statement:", err);
                }
                db.close((err) => {
                    if (err) {
                        console.error("Error closing database:", err);
                    } else {
                        console.log("Database setup complete.");
                    }
                });
            });
        } else {
            db.close((err) => {
                if (err) {
                    console.error("Error closing database:", err);
                } else {
                    console.log("Database already initialized.");
                }
            });
        }
    });
});

module.exports = db;
