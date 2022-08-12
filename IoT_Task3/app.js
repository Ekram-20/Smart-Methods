const express = require('express');
// const { copyFileSync } = require('fs');
const app = express();
const mysql = require('mysql2');

// create connection
let DBconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ' ',
  database: 'sensor_values'
});

// open connection
DBconnection.connect((err) => {
  if (err)
    return console.error('Failed to connect to DataBase');
});

// if there isn`t any paramenter
app.get('/', (req, response) => { 
  response.send("There isn`t any value from the sensor"); 
});

// sensor has sent values
app.get('/:value', (req, response) => {

  // sensor value from GET parameters
  let integerData = parseInt(req.params.value);

  // insert the value into db
  let recordToInsert = "INSERT INTO integer_values VALUE (?)";
  DBconnection.query(recordToInsert, [integerData], (err) => {
    if (err) return console.log('ERROR: The value wasn`t inserted');
    console.log('The value was inserted Successfully');
  });

  // dispaly the value that has stored in db
  let message = 'The Sensor Value ' + integerData + ' has stored in data base'  
  response.send(message);
});

app.listen(8000);





