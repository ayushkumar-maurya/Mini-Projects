const express = require('express');
const nodemailer = require('nodemailer');
const base = require('../base');
const dbOperations = require('../db/dbOperations');
const router = express.Router();
const from = base.EMAIL;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	tls: {
        rejectUnauthorized: false,
    },
	auth: {
		user: base.EMAIL,
		pass: base.PASSWORD
	}
});

// Inserting email to the database & Sending email to the recipient.
router.post('/send', (req, res) => {
	let response = {'isSent': false};

	if (req.session.userEmail !== undefined && req.session.userEmail) {
		let to = req.body.to;
		let subject = req.body.subject;
		let msg = req.body.msg;

		// Inserting email to the database.
		let newEmail = {'from': req.session.userEmail, 'to': to, 'subject': subject, 'message': msg, 'sentSuccess': false};
		dbOperations.insertOneDocument('emails', newEmail, emailId => {
			// Sending email to the recipient.
			const mailOptions = {
				from: from,
				to: to,
				subject: subject,
				text: msg
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (!error) {
					response.isSent = true;
					dbOperations.updateOneDocument('emails', {_id: emailId}, {sentSuccess: true}, () => res.json(response));
				}
				else
					res.json(response);
			});
		});
	}
	else
		res.json(response);
});

// Retrieving emails for inbox.
router.get('/retrieve/inbox', (req, res) => {
	if (req.session.userEmail !== undefined && req.session.userEmail) {
		dbOperations.findManyDocuments('emails',
			{ $and: [{to: req.session.userEmail}, {sentSuccess: true}] },
			{ from: 1, subject: 1 },
			emails => res.json(emails)
		);
	}
	else
		res.json([]);
});

// Retrieving sent emails.
router.get('/retrieve/sent', (req, res) => {
	if (req.session.userEmail !== undefined && req.session.userEmail) {
		dbOperations.findManyDocuments('emails',
			{ $and: [{from: req.session.userEmail}, {sentSuccess: true}] },
			{ to: 1, subject: 1 },
			emails => res.json(emails)
		);
	}
	else
		res.json([]);
});

// Retrieving emails for outbox.
router.get('/retrieve/outbox', (req, res) => {
	if (req.session.userEmail !== undefined && req.session.userEmail) {
		dbOperations.findManyDocuments('emails',
			{ $and: [{from: req.session.userEmail}, {sentSuccess: false}] },
			{ to: 1, subject: 1 },
			emails => res.json(emails)
		);
	}
	else
		res.json([]);
});

// Retrieving email data.
router.post('/retrieve/data', (req, res) => {
	if (req.session.userEmail !== undefined && req.session.userEmail) {
		let _id = dbOperations.getDocumentId(req.body.id);
		dbOperations.findOneDocument('emails', {_id: _id}, email => res.json(email));
	}
	else
		res.json({});
});

module.exports = router;
