const Employee = require("../models/employee.model")()
const config = require("../configuration/authentication.config");
const logger = require("../configuration/config").logger;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const SplunkLogger = require("splunk-logging/splunklogger");

var configo = {
    token: "043da257-dca8-4acb-943e-57d5ea0bf6fe",
    url: "http://localhost:8088",
    batchInterval: 1000,
    maxBatchCount: 10,
    maxBatchSize: 1024 // 1kb
	// Enable SSL certificate validationLogger.requestOptions.strictSSL = true;
};
// Enable SSL certificate 


var Logger = new SplunkLogger(configo)
Logger.requestOptions.strictSSL = true;



exports.signup = (req, res) =>
{
	const employee = new Employee({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		employeePrefix: req.body.employeePrefix,
		doctorPrefix: req.body.doctorPrefix,
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
			message: "employee was registered successfully!",
			_id: employee._id,
			email: employee.email,
			token: token
		});

		var payload = {
			message : {
				email: employee.email
			}
		
		}
		Logger.send(payload, function(err, resp, body) {
			console.log("response from Splunk", body)
		})
	});
};

exports.info = (req, res) =>
{
	res.status(200).json('Welkom op de API voor de F1 avans. /api/users /api/grandprixs  /api/drivers  /api/racewins  /api/constructors').end();
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

			res.status(200).send({
				employee: employee,
				token: token
			});
		});
};


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