const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const MeasurementSchema = new Schema({

    valueNumber: {
        type: Number,
        required: [true, 'A measurement needs to have a value.'],
    },
    date: {
        type: Date,
        required: [true, 'A measurement needs to have a date.'],  
    },
    diagnostic: {
        type: Schema.Types.ObjectId,
        ref: 'diagnostics'
    },
    
})

module.exports = getModel('measurements', MeasurementSchema)