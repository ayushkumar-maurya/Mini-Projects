const { dbGetUserPassword, dbGetExistingUser, dbSetUserInfo } = require('./db/dbOperations');
const { compareWithHashValue, getHashValue } = require('./utils/hash');

const home = () => {
	return {serverStatus: 'API Server is up and running!'}
};

const verifyUser = async (dbConn, { email, password }) => {
	let isUserVerified = false;

	if(email && password) {
		email = email.trim();

		// Fetching Password of User.
		let passwordRecord = await dbGetUserPassword(dbConn, email);

		// Verifying Password.
		if(passwordRecord && passwordRecord.length > 0)
			isUserVerified = await compareWithHashValue(passwordRecord[0].password, password);
	}

	return {authStatus: isUserVerified}
};

const addUser = async (dbConn, { email, password, name, mobileNo }) => {
	let createStatus = 'no';

	if(email && password && name && mobileNo) {
		email = email.trim();
		name = name.trim();
		mobileNo = mobileNo.trim();

		let existingUser = await dbGetExistingUser(dbConn, email, mobileNo);
		if(existingUser && existingUser.length === 0) {
			if(await dbSetUserInfo(dbConn, email, await getHashValue(password), name, mobileNo) === 1)
				createStatus = 'yes';
		}
		else
			createStatus = 'exists'
	}

	return {createStatus: createStatus}
};

module.exports = { home, verifyUser, addUser }
