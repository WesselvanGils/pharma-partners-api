const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getModel = require('./model_cache')
const MedicalRecordSchema = new Schema({
 
  prescriptions: [{
    type: Schema.Types.ObjectId,
    ref: "prescriptions",
    autopopulate: true,
  }],
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: "episodes",
    autopopulate: true,
  }],
  diagnostics: [{
    type: Schema.Types.ObjectId,
    ref: "diagnostics",
    autopopulate: true,
  }],

});

// mongoose plugin to always populate fields
MedicalRecordSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('medicalrecords', MedicalRecordSchema)
