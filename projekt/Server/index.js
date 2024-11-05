const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 5001;


//skapa databas
exec('node CreateDatabase.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error creating database: ${error}`);
        return;
    }
    console.log('Database Created Successfully');
});


app.get('/', (req, res) => {
    res.send('Server is running with sample data.');
});

//testing

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
