const Employee = require("../models/employee.model")()

const checkDuplicateEmail = (req, res, next) =>
{

		// Email
		Employee.findOne(
		{
			email: req.body.email
		}
		).exec((err, employee) =>
		{
			if (err)
			{
				res.status(500).send({ message: err });
				return;
			}

			if (employee)
			{
				res.status(400).send({ message: "Failed! Email is already in use!" });
				return;
			}

			next();
		});
};

const verifySignUp = {
	checkDuplicateEmail,
};

module.exports = verifySignUp;