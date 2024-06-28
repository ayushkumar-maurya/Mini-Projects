const bcrypt = require('bcryptjs');
const conn = require('./conn');

module.exports.dbRequest_VerifyUser = async (email, password) => {
    let recordFound = false;
    let sql = 'SELECT password FROM users WHERE email = ?';

    let records = await new Promise(resolve => {
      conn.query(sql, [email], (err, result) => {
        if (err) throw err;
        resolve(result);
      })
    });

    if(records.length > 0) {
      recordFound = await new Promise(resolve => {
        bcrypt.compare(password, records[0].password, (err, isCorrect) => resolve(isCorrect));
      });
    }

  return recordFound;
}
