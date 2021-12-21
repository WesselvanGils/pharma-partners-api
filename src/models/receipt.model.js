const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getModel = require("./model_cache");

const ReceiptSchema = new Schema({
  preparation: {
    type: String,
    required: [true, "A receipt needs to have a prepartion."],
  },
  dosage: {
    type: String,
    required: [true, "A receipt needs to have a dosage."],
  },
  publicationDate: {
    type: Date,
    required: [true, "A receipt needs to have a publicationDate."],
  },
  daysToTake: {
    type: String,
    required: [true, "A receipt needs to have a daysToTake."],
  },
  medication: {
    type: Schema.Types.ObjectId,
    ref: "medications",
    autopopulate: true,
  },
  medicalRecord: {
    type: Schema.Types.ObjectId,
    ref: "medicalrecords",
  },
});

// mongoose plugin to always populate fields
ReceiptSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel("receipts", ReceiptSchema);
