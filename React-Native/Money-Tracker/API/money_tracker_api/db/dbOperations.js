const bcrypt = require('bcryptjs');
const apiLog = require('../utils/apiLog');

exports.dbRequest_VerifyUser = async (dbConn, email, password) => {
    let recordFound = false;

    // Fetching User Password.
    let sql = 'SELECT password FROM users WHERE email = ?';
    let records = await new Promise(resolve => {
      dbConn.query(sql, [email], (err, data) => {
        let result = null;
        if(err)
          apiLog('Error', __filename, err);
        else
          result = data;
        resolve(result);
      })
    });

    // Verifying Password.
    if(records && records.length > 0) {
      recordFound = await new Promise(resolve => {
        bcrypt.compare(password, records[0].password, (err, isCorrect) => resolve(isCorrect));
      });
    }

  return recordFound;
}
