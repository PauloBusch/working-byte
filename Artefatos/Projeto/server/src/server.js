const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

const users = require('./controllers/users.controller');

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

app.use(cors());
app.use(bodyParser.json());
app.use('/', users);

app.get('/',(req, res) => {
  var msg = `
    API Server WorkingByte Works <br/>
    Server Time______: ${new Date()}<br/>
    Db workingbyte___: ${connection.state}<br/>
  `;

  res.send(msg);
});

app.listen(1300);