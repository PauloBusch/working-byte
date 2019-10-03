const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'workingbyte',
  password: '123456',
  database: 'workingbyte'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});