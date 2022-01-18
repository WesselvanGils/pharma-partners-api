const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const MedicationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A medication needs to have a name.'],
    },
    unit: {
        type: String,
        required: [true, 'A medication needs to have a unit.'],  
    },
    amount:
    {
        type: Number,
        required: [true, "A medication must have an amount"]
    },
    index: 
    {
        type: Number,
        required: [true, "A medication needs an index"]
    }
})

module.exports = getModel('medications', MedicationSchema)