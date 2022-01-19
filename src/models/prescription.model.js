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
    periodStart: {
        type: Date,
        required: [ true, 'A prescription needs to have a starting time.' ],
    },
    periodEnd: {
        type: Date,
        required: [ true, 'A prescription needs to have an ending time.' ],
    },
    medication: 
    {
        amount:
        {
            type: Number,
            required: [true, "A medication must have an amount"]
        },
        index: 
        {
            type: Number,
            required: [true, "A medication must have an index"]
        },
        name: 
        {
            type: String,
            required: [true, "A medication needs a name"]
        },
        unit:
        {
            type: String,
            required: [true, "A medication needs a unit"]
        }
    },
})

// mongoose plugin to always populate fields
PrescriptionSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('prescriptions', PrescriptionSchema)