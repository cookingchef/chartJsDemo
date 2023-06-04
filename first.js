const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'chart', // Replace with your MySQL database name
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Failed to connect to the MySQL database:', err);
      return;
    }
  
    console.log('Connected successfully to the MySQL database');
  });



  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS clicked_graph (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value INT NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (err) => {
  if (err) {
    console.error('Failed to create the table:', err);
    return;
  }

  console.log('Table created successfully');
});





canvas.addEventListener('click', (event) => {
    // ...
  
    // Insert the clicked graph information into the MySQL table
    const insertQuery = `
      INSERT INTO clicked_graph (label, value)
      VALUES (?, ?)
    `;
  
    connection.query(insertQuery, [clickedLabel, clickedValue], (err, result) => {
      if (err) {
        console.error('Failed to insert data into the table:', err);
        return;
      }
  
      console.log('Data inserted successfully');
    });
  
    // ...
  });
  