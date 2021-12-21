const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const MeasurementSchema = new Schema({
    valueNumber: {
        type: Number,
        required: [true, 'A measurement needs to have a value.'],
    },
    unit: {
        type: String,
        required: [true, 'A measurement needs to have a unit.'],  
    },
    date: {
        type: Date,
        required: [true, 'A measurement needs to have a date.'],  
    }
})

module.exports = getModel('measurements', MeasurementSchema)