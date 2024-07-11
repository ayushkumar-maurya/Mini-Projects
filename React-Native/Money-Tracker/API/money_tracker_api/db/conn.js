const mysql = require('mysql');
const apiLog = require('../utils/apiLog');

const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

dbConn.connect(err => {
	if(err)
    apiLog('Error', __filename, 'Database connection unsuccessful.', err);
	else
    apiLog('Info', null, 'Database connected successfully.');
});

module.exports = dbConn;
