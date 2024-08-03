const express = require('express');
const { encrypt, decrypt } = require('./utils/encryption');
const { home, verifyUser, addUser } = require('./service');

const getRoutes = dbConn => {
  const router = express.Router();  

  router.get('/', (req, res) => {
    res.json(home());
  });

  router.post('/verifyuser', async (req, res) => {
    if(req.body && req.body.data) {
      let resData = await verifyUser(dbConn, JSON.parse(decrypt(req.body.data)));
      res.json({data: encrypt(JSON.stringify(resData))});
    }
    else
      res.json(null);
  });

  router.post('/adduser', async (req, res) => {
    if(req.body && req.body.data) {
      let resData = await addUser(dbConn, JSON.parse(decrypt(req.body.data)));
      res.json({data: encrypt(JSON.stringify(resData))});
    }
    else
      res.json(null);
  });

  return router;
};

module.exports = getRoutes;
