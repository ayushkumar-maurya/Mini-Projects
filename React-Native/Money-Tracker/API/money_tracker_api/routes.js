const express = require('express');
const { home, verifyUser } = require('./service');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(home());
});

router.post('/verifyuser', async (req, res) => {
  let email = req.body.email.trim();
  let password = req.body.password.trim();
  res.json(await verifyUser(email, password));
});

module.exports = router;
