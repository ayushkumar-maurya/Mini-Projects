const apiLog = require('../utils/apiLog');

exports.dbGetUserPassword = async (dbConn, email) => {
    let sql = 'SELECT password FROM users WHERE email = ?';

    let records = await new Promise(resolve => {
      let result = null;

      dbConn.query(sql, [email], (err, data) => {
        if(err)
          apiLog('Error', __filename, err);
        else
          result = data;
        resolve(result);
      })
    });

    return records;
}
