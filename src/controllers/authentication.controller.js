 const Employee = require("../models/employee.model")()
 const config = require("../configuration/authentication.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.signup = (req, res) =>
{
	const employee = new Employee(
		{
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
			res.status(500).send({ message: err });
			return;
		}

		let token = jwt.sign({ id: employee.id }, config.secret, {
			expiresIn: 86400 // 24 hours
		});

        res.status(200).send({ 
            message: "employee was registered successfully!",
            _id: employee._id,
            email: employee.email,
            token: token
        });
	});
};

exports.info = (req, res) => {
    res.status(200).json('Welkom op de API voor de F1 avans. /api/users /api/grandprixs  /api/drivers  /api/racewins  /api/constructors').end();
  },

exports.signin = (req, res) =>
{
	Employee.findOne(
		{
			email: req.body.email
		})
		.exec((err, employee) =>
		{
			if (err)
			{
				res.status(500).send({ message: err });
				return;
			}

			if (!employee)
			{
				return res.status(404).send({ message: "Employee Not found." });
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid)
			{
				return res.status(401).send(
					{
						accessToken: null,
						message: "Invalid Password!"
					});
			}

			let token = jwt.sign({ id: employee.id }, config.secret, {
				expiresIn: 86400 // 24 hours
			});

			res.status(200).send({
				_id: employee._id,
				email: employee.email,
				token: token
			});
		});
};

