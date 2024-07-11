const { dbRequest_VerifyUser } = require('./db/dbOperations');

const home = () => {
	return {serverStatus: 'API Server is up and running!'}
};

const verifyUser = async (dbConn, email, password) => {
	return {isUserVerified: await dbRequest_VerifyUser(dbConn, email, password)}
};

module.exports = { home, verifyUser }
