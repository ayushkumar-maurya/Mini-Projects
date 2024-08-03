const { encrypt, decrypt } = require('./utils/encryption');
const { dbGetUserPassword, dbSetUserInfo } = require('./db/dbOperations');
const { compareWithHashValue, getHashValue } = require('./utils/hash');

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

	return {data: encrypt(JSON.stringify({authStatus: isUserVerified}))}
};

const addUser = async (dbConn, data) => {
	let { email, password, name, mobileNo } = JSON.parse(decrypt(data));
	let rowAffected = 0;

	if(email && password && name && mobileNo) {
		email = email.trim();
		name = name.trim();
		mobileNo = mobileNo;

		rowAffected = await dbSetUserInfo(dbConn, email, await getHashValue(password), name, mobileNo);
	}

	return {data: encrypt(JSON.stringify({rowAffected: rowAffected}))}
};

module.exports = { home, verifyUser, addUser }
