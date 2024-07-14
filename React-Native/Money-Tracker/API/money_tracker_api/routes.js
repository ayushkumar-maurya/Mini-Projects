const express = require('express');
const { home, verifyUser } = require('./service');

const getRoutes = dbConn => {
  const router = express.Router();  

  router.get('/', (req, res) => {
    res.json(home());
  });

  router.post('/verifyuser', async (req, res) => {
    if(req.body && req.body.data)
      res.json(await verifyUser(dbConn, req.body.data));
    else
      res.json(null);
  });

  return router;
};

module.exports = getRoutes;
