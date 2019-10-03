const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'workingbyte'
});
connection.connect((error) => {
  if (error){
    console.log('Erro!');
    throw error;
  } 
  console.log('Conectado!');
});

app.get('/',(req, res) => {

  
});

app.listen(1300);