const { dbGetUserPassword } = require('./db/dbOperations');
const { compareWithHashValue } = require('./utils/hash');

const home = () => {
	return {serverStatus: 'API Server is up and running!'}
};

const verifyUser = async (dbConn, email, password) => {
	let isUserVerified = false;

	// Fetching Password of User.
	let recordsPassword = await dbGetUserPassword(dbConn, email);

	// Verifying Password.
	if(recordsPassword && recordsPassword.length > 0)
		isUserVerified = await compareWithHashValue(recordsPassword[0].password, password);

	return {isUserVerified: isUserVerified}
};

module.exports = { home, verifyUser }
