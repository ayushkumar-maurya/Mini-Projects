const {
	dbGetUserInfo,
	dbGetExistingUser,
	dbSetUserInfo,
	dbSetTransaction,
	dbGetSources,
	dbGetBalanceAmounts
} = require('./db/dbOperations');
const { compareWithHashValue, getHashValue } = require('./utils/hash');

const home = () => {
	return {serverStatus: 'API Server is up and running!'}
};

const verifyUser = async (dbConn, { email, password }) => {
	let isUserVerified = false;
	let userId = null;

	if(email && password) {
		email = email.trim();

		// Fetching Password of User.
		let userRecord = await dbGetUserInfo(dbConn, email);

		// Verifying Password.
		if(userRecord && userRecord.length > 0)
			isUserVerified = await compareWithHashValue(userRecord[0].password, password);

		// Fetching User Id.
		if(isUserVerified)
			userId = userRecord[0].id;
	}

	return {authStatus: isUserVerified, userId: userId}
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
		let { authStatus, userId } = await verifyUser(dbConn, {email, password});
		if(authStatus) {
			if(userId && sourceId && amount && /^(-?[0-9]+)(\.[0-9]+)?$/.test(amount)) {
				if(description)
					description = description.trim();
				transactionAdded = await dbSetTransaction(dbConn, userId, sourceId, description, amount) === 1
			}
		}
	}

	return {transactionAdded: transactionAdded}
};

const getSources = async dbConn => {
	return {sources: await dbGetSources(dbConn)}
};

const getBalanceAmounts = async (dbConn, { email, password }) => {
	let balanceAmounts = null;

	if(email && password) {
		// Authenticating User.
		let { authStatus, userId } = await verifyUser(dbConn, {email, password});
		if(authStatus && userId)
			balanceAmounts = await dbGetBalanceAmounts(dbConn);
	}

	return {balanceAmounts: balanceAmounts}
};

module.exports = { home, verifyUser, addUser, addTransaction, getSources, getBalanceAmounts }
