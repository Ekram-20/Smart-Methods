const express = require('express');
const app = express();
const mysql = require('mysql2');

// create connection
let DBconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ' ',
  database: 'robot_movements'
});

// open connection
DBconnection.connect((err) => {
  if (err)
    return console.error('Failed to connect to DataBase');
});

app.get('/:value', (request, response) => {  
  
  let moveType = request.params.value;
 
  // insert the robot move into db
  let recordToInsert = "INSERT INTO movements VALUE (?)";
  DBconnection.query(recordToInsert, [moveType], (err) => {
    if (err) return console.log('ERROR: The value wasn`t inserted');
    console.log('The value was inserted Successfully');
  }); 
});

app.listen(8000);