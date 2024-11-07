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
    database: process.env.DB_NAME,
    multipleStatements: true
});


app.get('/', (req, res) => {
    res.send('Server is running with sample data.');
});


//"curl "http://localhost:5001/get_Modul?kursKod=D0031N""

app.get('/get_Modul', async (req, res) => {
    const querystring = 'CALL EpokDBGetModul(?);';
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

//"   curl "http://localhost:5001/getStudentGradesAssignment?assignmentId=1"  "
app.get('/getStudentGradesAssignment', async (req, res) => {
    const querystring = 'call getGradesForAssignment(?)';
    const assignmentId = req.query.assignmentId;

    if (!assignmentId) {
        res.status(400).send('Missing required query parameter: assignmentId');
        return
    }
    db.query(querystring, [assignmentId], (err, results) => {
        if (err) {
            console.error('Failed to fetch grades:', err);
            res.status(500).send('Failed to fetch grades');
            return;
        }
        res.json(results[0]);
    });

});

//"curl "http://localhost:5001/get_Persnummer?userName=tomyou-9" "
app.get('/get_Persnummer', async (req, res) => {
    const querystring = 'call itsAdminGetUserName(?)';
    const persnummer = req.query.userName;

    if (!persnummer) {
        res.status(400).send('Missing required query parameter: userName');
        return;

    }

    db.query(querystring, [persnummer], (err, results) => {
        if (err) {
            console.error('Failed to fetch persnummer:', err);
            res.status(500).send('Failed to fetch persnummer');
            return;
        }
        res.json(results[0]);
    });
});


//testing

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
