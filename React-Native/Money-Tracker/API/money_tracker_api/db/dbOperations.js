const apiLog = require('../utils/apiLog');

exports.dbGetUserInfo = async (dbConn, email) => {
    let sql = 'SELECT id, password FROM users WHERE email = ?';

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

exports.dbSetTransaction = async (dbConn, userID, sourceId, description, amount) => {
  let sql = 'INSERT INTO transactions (user_id, source_id, description, amount) VALUES (?, ?, ?, ?)';

  let rowsAffected = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, [userID, sourceId, description, amount], (err, data) => {
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

exports.dbGetStatement = async (dbConn, userId, sourceId) => {
  let sql = `
    SELECT
      t.description,
      DATE_FORMAT(t.datetime, '%d %b %Y %H:%i') AS datetime,
      s.name AS source,
      t.amount
    FROM (SELECT *
          FROM transactions
          WHERE user_id = ?
          AND source_id = ?) t
    INNER JOIN sources s
    ON t.source_id = s.id
    ORDER BY t.datetime;
  `;

  let records = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, [userId, sourceId], (err, data) => {
      if(err)
        apiLog('Error', __filename, err);
      else
        result = data;
      resolve(result);
    })
  });

  return records;
}

exports.dbGetBalanceAmounts = async (dbConn, userId) => {
  let sql = `
    SELECT s.name, t.total_amount
    FROM (SELECT source_id, SUM(amount) AS total_amount
          FROM transactions
          WHERE user_id = ?
          GROUP BY source_id) t
    INNER JOIN sources s
    ON t.source_id = s.id;
  `;

  let records = await new Promise(resolve => {
    let result = null;

    dbConn.query(sql, [userId], (err, data) => {
      if(err)
        apiLog('Error', __filename, err);
      else
        result = data;
      resolve(result);
    })
  });

  return records;
}
