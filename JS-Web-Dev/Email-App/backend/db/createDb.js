const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/email_app";

MongoClient.connect(url, (err, db) => {
	if (err) throw err;
	console.log("Database created successfully.");
	db.close();
});
