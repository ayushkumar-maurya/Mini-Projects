const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: '1234',
	resave: true,
	saveUninitialized: true
}));
app.use('/auth', require(path.join(__dirname, 'routes/auth.js')));
app.use('/email', require(path.join(__dirname, 'routes/email.js')));

app.listen(5000);
