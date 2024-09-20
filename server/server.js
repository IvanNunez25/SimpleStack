const express = require('express');
const app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'mortalidad',
    user: 'root',
    password: '',
});

connection.connect( function(err) {
    if ( err ) {
        console.error('Error Connecting' + err.stack );
        return;
    }

    console.log( 'Connected as id ' + connection.threadId );
});

app.get('/api', (req, res) => {
    // Perform MySQL query
    connection.query('SELECT * FROM casos LIMIT 10000', function(error, results, fields) {
        if (error) {
            console.error('Error during query:', error);
            res.status(500).json({ error: 'Database query failed' });
            return;
        }
        
        // Send query results as JSON
        res.json(results);
    });
});

app.listen(5000, () => { console.log("Server started on port 5000")});
