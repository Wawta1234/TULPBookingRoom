const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "tulpbookingrooms"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = db;
