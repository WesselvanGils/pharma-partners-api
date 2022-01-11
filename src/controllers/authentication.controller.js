const Employee = require("../models/employee.model")()
const config = require("../configuration/authentication.config");
const logger = require("../configuration/config").logger;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const API_KEY = 'ClHjxmnmS7RLM3Z94JodxkaTVEBdhIOA';
const authy = require('authy')(API_KEY);
const cookies = require('cookie-parser');


exports.auth = (req, res) => {
	if (req.body.login === 'testy@test.nl' && req.body.password === 'password') {
	  authy.send_approval_request('Authy ID', {
		  message: 'Request to login to Angular two factor authentication with Twilio'
		}, null, null,  function(err, authResponse) {
		  if (err) {
			res.status(400).send('Bad Request');
		  } else {
			res.status(200).send({token: authResponse.approval_request.uuid});
		  }
	  });
	} else {
	  res.status(401).send('Bad credentials');
	}
   }

exports.signup = (req, res) =>
{
	const employee = new Employee({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		employeeCode: req.body.employeeCode,
		doctorCode: req.body.doctorCode,
	});

	employee.save((err, user) =>
	{
		if (err)
		{
			res.status(500).send({
				message: err
			});
			return;
		}

		let token = jwt.sign({
			id: employee.id
		}, config.secret, {
			expiresIn: 86400 // 24 hours
		});

		res.status(200).send({
			message: "Employee was registered successfully!",
			_id: employee._id,
			email: employee.email,
			token: token
		});

	});
};

exports.info = (req, res) =>
{
	res.status(200).json('Welkom op de API voor PharmaPartners.').end();
}

exports.signin = (req, res) =>
{
	Employee.findOne({
		email: req.body.email
	})
		.exec((err, employee) =>
		{
			if (err)
			{
				res.status(500).send({
					message: err
				});
				return;
			}

			if (!employee)
			{
				return res.status(404).send({
					message: "Deze medewerker is niet gevonden."
				});
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				employee.password
			);

			if (!passwordIsValid)
			{
				return res.status(401).send({
					accessToken: null,
					message: "Het gegeven wachtwoord is incorrect."
				});
			}

			let token = jwt.sign({
				id: employee.id
			}, config.secret, {
				expiresIn: 86400 // 24 hours
			});

			authy.send_approval_request('517898802', { //Account ID
				message: 'Request to login to PharmaPartners two factor authentication with Twilio'
			}, null, null, function(err, authResponse){
				if(err){
					console.log('Approval Twilio: bad request')
					res.status(400).send('Bad Request');
				} else{
					console.log('Request approved')
					res.status(200).send({
						employee: employee,
						token: token,
						authToken: authResponse.approval_request.uuid,
					});
				}
			});
			
		});
};

exports.getStatus = (req, res) => {
	authy.check_approval_status(req.headers.authToken, (err, authResponse) => {
		if(err){
			res.status(400).send('Bad Request');
		} else{
			if(authResponse.approval_request.status === 'approved'){
				console.log('Twilio request was approved!')
				res.cookie('authentication', 'super-encrypted-value-indicating-that-user-is-authenticated!', {
					maxAge: 5 * 60 * 60 * 60,
					httpOnly: true
				});
			}
			res.status(200).send({status: authResponse.approval_request.status});
		}
	})
}

exports.isLogged = (req, res) => {
	res.status(200).send({authenticated: req.cookies.authentication === 'super-encrypted-value-indicating-that-user-is-authenticated!'})
}

exports.getEmployeeFromToken = (req, res, next, callback) => {

	const authHeader = req.headers.authorization;
    const token = authHeader.substring(7, authHeader.length);
    jwt.verify(token, config.secret, (err, decoded) => { if (decoded) {
		let userId = decoded.id 
		Employee.findById(userId).exec((error, employee) => {
			if (error)
			{
				console.log(error.message)
				callback(error.message)
			}
	
			if (!employee)
			{
				console.log("no employee boss")

				callback("no employee", undefined)

			} else {
				callback(undefined, employee)
			}
		})

	} } );	
}


exports.validateToken = (req, res, next) =>
{
	logger.info("validateToken called");
	// logger.trace(req.headers)
	Employee.findById(req.params.id).exec((error, employee) =>
	{
		if (error)
		{
			res.status(500).send({
				message: error
			});
			return;
		}

		if (!employee)
		{
			return res.status(404).send({
				message: "Employee Not found."
			});
		}

		const authHeader = req.headers.authorization;
		if (!authHeader)
		{
			logger.warn("Authorization header missing!");
			res.status(401).json({
				error: "Authorization header missing!",

			})
		} else
		{
			// Strip the word 'Bearer ' from the headervalue
			const token = authHeader.substring(7, authHeader.length);

			jwt.verify(token, config.secret, (err, payload) =>
			{
				if (err)
				{
					logger.warn("Not authorized");
					res.status(401).json({
						error: "Not authorized",

					});
				}
				if (payload)
				{
					logger.debug("token is valid", payload);
					req.userId = payload.id;
					res.status(202).json(
						{
							employee: employee,
							token: token
						}
					)
				}
			})
		}
	})
}