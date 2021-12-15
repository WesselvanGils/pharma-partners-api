const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getModel = require('./model_cache')
const MeetingSchema = new Schema({

  startDate: {
    type: Date,
    required: [true, "A meeting needs to have a start date."],
  },
  endDate: {
    type: Date,
    required: [true, "A meeting needs to have a end date."],
  },
  subject: {
    type: String,
    required: [true, "A meeting needs to have a subject."],
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
});

// mongoose plugin to always populate fields
MeetingSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('meetings', MeetingSchema)
