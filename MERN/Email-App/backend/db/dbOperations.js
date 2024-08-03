const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/";

// Inserting a Document into Collection.
module.exports.insertOneDocument = (CollectionName, document, afterInsertion) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		const dbo = db.db("email_app");
		dbo.collection(CollectionName).insertOne(document, (err, res) => {
			if (err) throw err;
			db.close();
			afterInsertion(res.insertedId);
		});
	});
};

// Finding a Document from the Collection.
module.exports.findOneDocument = (CollectionName, query, afterFinding) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		const dbo = db.db("email_app");
		dbo.collection(CollectionName).findOne(query, (err, res) => {
			if (err) throw err;
			db.close();
			afterFinding(res);
		});
	});
};

// Finding many Documents from the Collection.
module.exports.findManyDocuments = (CollectionName, query, projection, afterFinding) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		const dbo = db.db("email_app");
		dbo.collection(CollectionName).find(query, {projection: projection}).toArray((err, result) => {
			if (err) throw err;
			db.close();
			afterFinding(result);
		});
	});
};

// Updating values of a Document.
module.exports.updateOneDocument = (CollectionName, query, updatedValues, afterUpdating) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		const dbo = db.db("email_app");
		let newValues = {$set: updatedValues};
		dbo.collection(CollectionName).updateOne(query, newValues, (err, res) => {
			if (err) throw err;
			db.close();
			afterUpdating();
		});
	});
};

// Returning document id.
module.exports.getDocumentId = id => new ObjectId(id);
