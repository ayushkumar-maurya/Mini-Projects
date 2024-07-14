const { encrypt, decrypt } = require('./utils/encryption');
const { dbGetUserPassword } = require('./db/dbOperations');
const { compareWithHashValue } = require('./utils/hash');

const home = () => {
	return {serverStatus: 'API Server is up and running!'}
};

const verifyUser = async (dbConn, data) => {
	let { email, password } = JSON.parse(decrypt(data));
	let isUserVerified = false;

	if(email && password) {
		email = email.trim();

		// Fetching Password of User.
		let recordsPassword = await dbGetUserPassword(dbConn, email);

		// Verifying Password.
		if(recordsPassword && recordsPassword.length > 0)
			isUserVerified = await compareWithHashValue(recordsPassword[0].password, password);
	}

	return {data: encrypt(JSON.stringify({isUserVerified: isUserVerified}))}
};

module.exports = { home, verifyUser }
