// File Type: API endpoint

const express = require('express');
const nodemailer = require('nodemailer');

// This router handles sending a user a link to reset their password if they have forgotton it
const router = express.Router();

// This method sends an email to iminsys.carpool@gmail.com with a problem reported by a user
// Parameters: 
//      reportedProblem: String;  This is the problem description.
// Return Value:
//      Response containing: 
//          success: boolean;  True if the action was completed.
//          message: String;  Contains the error message or completion message.
router.post('/', (req, res, next) => {
	const { body } = req;
	let { reportedProblem } = body;
	let emailSubject = "Reported Problem: '" + reportedProblem.substr(0, 15) + "...'"

	//send email with reportedProblem to iminsys.carpool@gmail.com
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'iminsys.carpool@gmail.com',
			pass: 'L1zD@nM@r'
		}
	});
	const mailOptions = {
		from: 'iminsys.carpool@gmail.com',
		to: 'iminsys.carpool@gmail.com',
		subject: emailSubject,
		text: reportedProblem,
	};
	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			return res.send({
				success: false,
				message: "Error sending email"
			});
		} else {
			return res.send({
				success: true,
				message: "Email sent"
			});
		}
	});
});

module.exports = router;