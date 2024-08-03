const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, db) => {
	if (err) throw err;
	const dbo = db.db("email_app");
	dbo.createCollection("users", (err, res) => {
		if (err) throw err;
		console.log("Collection 'users' created successfully.");
		db.close();
	});
});

MongoClient.connect(url, (err, db) => {
	if (err) throw err;
	const dbo = db.db("email_app");
	dbo.createCollection("emails", (err, res) => {
		if (err) throw err;
		console.log("Collection 'emails' created successfully.");
		db.close();
	});
});
