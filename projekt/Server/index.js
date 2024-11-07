const express = require('express');
const { exec } = require('child_process');
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 5001;
require('dotenv').config();



//skapa databas
exec('node CreateDatabase.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error creating database: ${error}`);
        return;
    }
    console.log('Database Created Successfully');
});
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true
});


app.get('/', (req, res) => {
    res.send('Server is running with sample data.');
});

app.get('/getModuler', async (req, res) => {
    const querystring = 'CALL mydb.EpokDBGetModul(?);';
    const kursKod = req.query.kursKod;
    if (!kursKod) {
        res.status(400).send('Missing required query parameter: kursKod');
        return;
    }

    db.query(querystring, [kursKod], (err, results) => {
        if (err) {
            console.error('Failed to fetch moduler:', err);
            res.status(500).send('Failed to fetch moduler');
            return;
        }
        res.json(results[0]);
    });

});

//testing

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
