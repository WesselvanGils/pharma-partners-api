const Employee = require("../models/employee.model")()
const config = require("../configuration/authentication.config");
const logger = require("../configuration/config").logger;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


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

			res.status(200).send({
				employee: employee,
				token: token
			});
		});
};

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