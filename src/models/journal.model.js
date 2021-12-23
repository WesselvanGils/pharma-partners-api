const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getModel = require("./model_cache");

const JournalSchema = new Schema({
	publicationDate: {
		type: Date,
		required: [ true, "A journal needs to have a publicationDate." ]
	},
	SOEP: 
	{
		S:
		{
			type: String,
		},
		O:
		{
			type: String,
		},
		E:
		{
			type: String,
		},
		P:
		{
			type: String,
		},
	},
	ICPC: {
		type: String,
		required: [ true, "A journal needs to have a ICPC." ]
	},
	consult: {
		type: String,
		required: [ true, "A journal needs to have a consult." ]
	},
	characteristics: {
		type: String,
		required: [ true, "A journal needs to have a characteristics." ]
	},
});

// mongoose plugin to always populate fields
JournalSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel("journals", JournalSchema);