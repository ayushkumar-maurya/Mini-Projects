const {
	dbGetUserPassword,
	dbGetExistingUser,
	dbSetUserInfo,
	dbSetTransaction,
	dbGetSources
} = require('./db/dbOperations');
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

		// Verifying whether User with the mentioned email or mobile no. doesn't exist.
		let existingUser = await dbGetExistingUser(dbConn, email, mobileNo);
		if(existingUser && existingUser.length === 0) {
			// Adding new User record.
			if(await dbSetUserInfo(dbConn, email, await getHashValue(password), name, mobileNo) === 1)
				createStatus = 'yes';
		}
		else
			createStatus = 'exists'
	}

	return {createStatus: createStatus}
};

const addTransaction = async (dbConn, { email, password, sourceId, description, amount }) => {
	transactionAdded = false;

	if(email && password) {
		// Authenticating User.
		let { authStatus } = await verifyUser(dbConn, {email, password});
		if(authStatus) {
			if(sourceId && amount && /^([0-9]+)(\.[0-9]+)?$/.test(amount)) {
				if(description)
					description = description.trim();
				transactionAdded = await dbSetTransaction(dbConn, sourceId, description, amount) === 1
			}
		}
	}

	return {transactionAdded: transactionAdded}
};

const getSources = async dbConn => {
	return {sources: await dbGetSources(dbConn)}
};

module.exports = { home, verifyUser, addUser, addTransaction, getSources }
