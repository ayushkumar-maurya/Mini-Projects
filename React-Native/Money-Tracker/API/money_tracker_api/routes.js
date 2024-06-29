const express = require('express');
const { home, verifyUser } = require('./service');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(home());
});

router.post('/verifyuser', async (req, res) => {
  if(req.body && req.body.email && req.body.password) {
    let email = req.body.email.trim();
    let password = req.body.password;
    res.json(await verifyUser(email, password));
  }
  else
    res.json(null);
});

module.exports = router;
