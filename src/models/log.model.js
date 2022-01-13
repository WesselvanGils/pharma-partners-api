const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const LogSchema = new Schema({
    log: {
        type: String,
        required: [true, 'A Log needs to have a log.'],
    },
})

module.exports = getModel('logs', LogSchema)