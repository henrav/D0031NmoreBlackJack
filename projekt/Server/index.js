const express = require('express');
const { exec } = require('child_process');
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 5001;
require('dotenv').config();
const mysql2 = require('mysql2/promise');
const {response} = require("express");
app.use(express.json());

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

const db2 = mysql2.createConnection({
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


// " curl "http://localhost:5001/get_Assignments?courseID=1" "
app.get('/get_Assignments', async (req, res) => {
    const querystring = 'CALL getAssignmentsForCourse(?)';
    const courseID = req.query.courseID;

    if (!courseID) {
        res.status(400).send('Missing required query parameter: courseID');
        return
    }

    db.query(querystring, [courseID], (err, results) => {
        if (err) {
            console.error('Failed to fetch assignments:', err);
            res.status(500).send('Failed to fetch assignments');
            return;
        }
        res.json(results[0]);

    });
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
        console.log(results[0]);
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

app.post('/reg_Resultat', async (req, res) => {
    const querystring = 'INSERT INTO LadokDB (personNR, förNamn, efterNamn, betyg, ExDatum, modul, kursKod) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const { Modul, KursKod, ELEVER } = req.body.grade;

    if (!Modul || !KursKod || !ELEVER) {
        res.status(400).json({
            status:'error',
            message:'missing required body parameters',
            missingFields: ['Modul', 'KursKod', 'ELEVER']
        });
        return; // End the request here
    }

    const duplicates = [];
    const failed = [];
    const successes = [];


    for (const student of ELEVER) {
        const { Pnr, förnamn, efternamn, betyg, datum } = student;

        if (!Pnr || !förnamn || !efternamn || !betyg || !datum) {
            console.error(`Missing parameters for student ${JSON.stringify(student)}`);
            failed.push(Pnr);
            continue; // Skip this student and continue with the rest
        }

        try {
            // Insert into the database
            await (await db2).query(querystring, [
                Pnr,
                förnamn,
                efternamn,
                betyg,
                datum,
                Modul,
                KursKod,
            ]);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.error(`Duplicate entry for student ${Pnr}`);
                duplicates.push(Pnr);
            } else {
                console.error(`Database error for student ${Pnr}:`, err);
                failed.push(Pnr);
            }
        }
    }
    if (failed.length > 0){
        res.status(207).json({
            status: 'failed',
            students: failed,
            message: 'some students fucked up'
        });
    }else if (duplicates.length > 0){
        res.status(207).json({
            status: 'duplicate entries',
            students: duplicates,
            message: 'some students already have grades registered'
        });
    }else {
        res.status(200).json({
            status: 'ok',
            students: successes,
            message: 'All students registered successfully'
        });
    }

});


//testing

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
