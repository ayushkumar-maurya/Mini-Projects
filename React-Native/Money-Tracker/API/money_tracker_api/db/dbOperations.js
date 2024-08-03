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

exports.dbGetExistingUser = async (dbConn, email, mobileNo) => {
  let sql = 'SELECT email FROM users WHERE email = ? OR mobile_no = ?';

  let records = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, [email, mobileNo], (err, data) => {
      if(err)
        apiLog('Error', __filename, err);
      else
        result = data;
      resolve(result);
    })
  });

  return records;
}

exports.dbSetUserInfo = async (dbConn, email, password, name, mobileNo) => {
  let sql = 'INSERT INTO users (email, password, name, mobile_no) VALUES (?, ?, ?, ?)';

  let rowsAffected = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, [email, password, name, mobileNo], (err, data) => {
      if(err)
        apiLog('Error', __filename, err);
      else
        result = data;
      resolve(result.affectedRows);
    })
  });

  return rowsAffected;
}

exports.dbSetTransaction = async (dbConn, sourceId, description, amount) => {
  let sql = 'INSERT INTO transactions (source_id, description, amount) VALUES (?, ?, ?)';

  let rowsAffected = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, [sourceId, description, amount], (err, data) => {
      if(err)
        apiLog('Error', __filename, err);
      else
        result = data;
      resolve(result.affectedRows);
    })
  });

  return rowsAffected;
}

exports.dbGetSources = async dbConn => {
  let sql = 'SELECT id, name FROM sources';

  let records = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, (err, data) => {
      if(err)
        apiLog('Error', __filename, err);
      else
        result = data;
      resolve(result);
    })
  });

  return records;
}
