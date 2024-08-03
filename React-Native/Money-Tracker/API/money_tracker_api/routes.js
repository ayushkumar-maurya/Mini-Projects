const express = require('express');
const { encrypt, decrypt } = require('./utils/encryption');
const { home, verifyUser, addUser, addTransaction } = require('./service');

const getRoutes = dbConn => {
  const router = express.Router();  

  router.get('/', (req, res) => {
    res.json(home());
  });

  router.post('/verifyuser', async (req, res) => {
    res.json(await handleEncReqRes(req, dbConn, verifyUser));
  });

  router.post('/adduser', async (req, res) => {
    res.json(await handleEncReqRes(req, dbConn, addUser));
  });

  router.post('/addtransaction', async (req, res) => {
    res.json(await handleEncReqRes(req, dbConn, addTransaction));
  });

  return router;
};

const handleEncReqRes = async (req, dbConn, functionality) => {
  if(req.body && req.body.data) {
    let resData = await functionality(dbConn, JSON.parse(decrypt(req.body.data)));
    return {data: encrypt(JSON.stringify(resData))}
  }
  else
    return null;
};

module.exports = getRoutes;
