
require('dotenv').config({ path: '.env' });

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
//yooooo
// databas connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true
});

// läs sql filerna
const createSchemaSQL = fs.readFileSync(path.join(__dirname, 'SQL', 'CreateDB.sql'), 'utf8');
const loadDataSQL = fs.readFileSync(path.join(__dirname, 'SQL', 'SampleData.sql'), 'utf8');

// connecta till mysql och ska skapa databasen
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL for setup.');

    // skapa database
    db.query(createSchemaSQL, (err) => {
        if (err) throw err;
        console.log('Schema created/exists.');

        // ladda in datan i databasen
        db.changeUser({ database: 'mydb' }, (err) => {
            if (err) throw err;

            db.query(loadDataSQL, (err) => {
                if (err) throw err;
                console.log('Data loaded successfully.');
                db.end();
            });
        });
    });
});




