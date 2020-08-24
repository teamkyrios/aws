var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'aa1tq2u6tt6wvk7.cjtc6ddtdcxy.us-east-1.rds.amazonaws.com',
	user: 'kyrios',
	password: 'DBPassword',
	port: '3306',
});

connection.connect(function (err) {
	if (err) {
		console.error('Database connection failed: ' + err.stack);
		return;
	}

	alert('Connected to database.');
});

export default connection;
