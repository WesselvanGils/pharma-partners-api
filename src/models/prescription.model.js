const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const PrescriptionSchema = new Schema({
    description: {
        type: String,
        required: [ true, 'A prescription needs to have a description.' ],
    },
    dosage: {
        type: String,
        required: [ true, 'A prescription needs to have a dosage.' ],
    },
    publicationDate: {
        type: Date,
        required: [ true, 'A prescription needs to have a publicationDate.' ],
    },
    period: {
        type: String,
        required: [ true, 'A prescription needs to have a time period.' ],
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