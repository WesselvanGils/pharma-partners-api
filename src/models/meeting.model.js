const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getModel = require('./model_cache')
const MeetingSchema = new Schema(
{
	description: {
		type: String,
		required: ['A meeting needs to have a description']
	},
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
			required: [ true, "A meeting needs to have a title." ]
		},
		start:
		{
			type: Date,
			required: [ true, "A meeting needs to have a start date." ]
		},
		end:
		{
			type: Date,
			required: [ true, "A meeting needs to have a start date." ]
		}
	}
});

// mongoose plugin to always populate fields
MeetingSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('meetings', MeetingSchema)
