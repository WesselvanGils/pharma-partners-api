const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getModel = require("./model_cache");

const DiagnosticSchema = new Schema({
  name: {
    type: String,
    required: [true, "A medication needs to have a name."],
  },
  unit: {
    type: String,
    required: [true, "A medication needs to have a unit."],
  },
  measurements: [
    {
      type: Schema.Types.ObjectId,
      ref: "measurements",
      autopopulate: true,
    },
  ],
  medicalRecord: {
      type: Schema.Types.ObjectId,
      ref:'medicalrecords'
  },
});

// mongoose plugin to always populate fields
DiagnosticSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel("diagnostics", DiagnosticSchema);
