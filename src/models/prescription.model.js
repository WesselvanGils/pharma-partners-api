const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const PrescriptionSchema = new Schema({
    description: {
        type: String,
        required: [ true, 'A receipt needs to have a prepartion.' ],
    },
    dosage: {
        type: String,
        required: [ true, 'A receipt needs to have a dosage.' ],
    },
    publicationDate: {
        type: Date,
        required: [ true, 'A receipt needs to have a publicationDate.' ],
    },
    period: {
        type: String,
        required: [ true, 'A receipt needs to have a daysToTake.' ],
    },
    medication: {
        type: Schema.Types.ObjectId,
        ref: "medications",
        autopopulate: true,
    },
})


// mongoose plugin to always populate fields
PrescriptionSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('presciptions', PrescriptionSchema)