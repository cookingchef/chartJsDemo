const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'chart', // Replace with your MySQL database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to the MySQL database:', err);
    return;
  }

  console.log('Connected successfully to the MySQL database');
});

// Handle POST request to /submit endpoint
app.post('/submit', (req, res) => {
  const { label, value } = req.body;

  // Perform actions to process and save the submitted data
  // For example, you can insert the data into the database

  const insertQuery = `
    INSERT INTO clicked_graph (label, value)
    VALUES (?, ?)
  `;

  connection.query(insertQuery, [label, value], (err, result) => {
    if (err) {
      console.error('Failed to insert data into the table:', err);
      res.status(500).send('Failed to submit data to the server');
      return;
    }

    console.log('Data submitted to the server.');
    res.status(200).send('Data submitted successfully');
  });
});

// Serve the "first.html" file
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'first.html');
  res.sendFile(filePath);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
