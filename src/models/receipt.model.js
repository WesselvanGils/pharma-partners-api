const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const ReceiptSchema = new Schema({
    prepartion: {
        type: String,
        required: [true, 'A receipt needs to have a prepartion.'],
    },
    dosage: {
        type: String,
        required: [true, 'A receipt needs to have a dosage.'],
    },
    publicationDate: {
        type: Date,
        required: [true, 'A receipt needs to have a publicationDate.'],
    },
    daysToTake: {
        type: Number,
        required: [true, 'A receipt needs to have a daysToTake.'],
    },
    medication: {
        type: Schema.Types.ObjectId,
        ref: "medications",
        autopopulate: true,
      },
})


// mongoose plugin to always populate fields
MeetingSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('receipts', ReceiptSchema)