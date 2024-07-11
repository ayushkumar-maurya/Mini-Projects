const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
dotenv.config()
const dbConn = require('./db/conn');
const apiLog = require('./utils/apiLog');

const app = express();

app.use(express.json());

app.use('/', routes(dbConn));

const PORT = process.env.PORT
app.listen(PORT, () => {
  apiLog('Info', null, 'API Server is up and running!');
});
