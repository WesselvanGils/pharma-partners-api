const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getModel = require('./model_cache')
const MeetingSchema = new Schema(
{
	employee: {
		type: Schema.Types.ObjectId,
		ref: "employees",
		autopopulate: true,
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: "patients",
		autopopulate: true,
	},
	meeting:
	{
		title:
		{
			type: String,
			required: [ true, "" ]
		},
		start:
		{
			type: Date,
			required: [ true, "" ]
		},
		end:
		{
			type: Date,
			required: [ true, "" ]
		}
	}
});

// mongoose plugin to always populate fields
MeetingSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('meetings', MeetingSchema)
