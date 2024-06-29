const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config()

app.use(express.json());

app.use('/', require(path.join(__dirname, './routes.js')));

const PORT = process.env.PORT
app.listen(PORT, function(req, res) {
  console.log('API Server is up and running!');
});
