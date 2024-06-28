const express = require('express');
const bcrypt = require('bcryptjs');
const dbOperations = require('../db/dbOperations');
const router = express.Router();

// Creating new user.
router.post('/create_user', (req, res) => {
	let response = {'isSuccess': null, 'doesUserExists': null};

	let name = req.body.name.trim();
	let email = req.body.email.trim();
	let pwd = req.body.pwd;
	let cpwd = req.body.cpwd;

	// Validating the entered field values by the user.
	if (name !== '' && /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]+)(\.[a-z]+)?(\.([a-z]+))$/.test(email) &&
			pwd !== '' && pwd === cpwd) {
		// Verifying that the user's account does not already exists.
		dbOperations.findOneDocument('users', {'email': email}, user => {
			if (user === null) {
				// Creating password hash.
				bcrypt.hash(pwd, 10, (err, hash) => {
					// Saving user data in the database.
					let newUser = {'name': name, 'email': email, 'password': hash};
					dbOperations.insertOneDocument('users', newUser, userId => {
						response.isSuccess = true;
						response.userName = name;
						response.userEmail = email;
						req.session.userEmail = email;
						res.json(response);
					});
				});
			}
			else {
				response.isSuccess = false;
				response.doesUserExists = 1;
				res.json(response);
			}
		});
	}
	else {
		response.isSuccess = false;
		res.json(response);
	}
});

// User login.
router.post('/login', (req, res) => {
	let response = {'isSuccess': null, 'error': null};

	let email = req.body.email.trim();
	let pwd = req.body.pwd;

	// Verifying that the user's account exists.
	dbOperations.findOneDocument('users', {'email': email}, user => {
		if (user !== null) {
			// Verifying the entered password.
			bcrypt.compare(pwd, user.password, function(err, isCorrect) {
				if (isCorrect) {
					response.isSuccess = true;
					response.userName = user.name;
					response.userEmail = email;
					req.session.userEmail = email;
				}
				else {
					response.isSuccess = false;
					response.error = 'Incorrect password.';
				}
				res.json(response);
			});
		}
		else {
			response.isSuccess = false;
			response.error = 'User with email ' + email + ' does not exists.';
			res.json(response);
		}
	});
});

// User logout.
router.get('/logout', (req, res) => {
	if (req.session.userEmail !== undefined && req.session.userEmail)
		req.session.destroy(error => res.json({'isSuccess': true}));
	else
		res.json({'isSuccess': false})
});

module.exports = router;
