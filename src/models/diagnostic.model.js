const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const DiagnosticSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A diagnostic needs to have a name.'],
    },
    unit: {
        type: String,
        required: [true, 'A diagnostic needs to have a unit.'],  
    },
    measurement: {
        type: Schema.Types.ObjectId,
        ref: "measurements",
        autopopulate: true,
      },
})

// mongoose plugin to always populate fields
MeetingSchema.plugin(require("mongoose-autopopulate"));


module.exports = getModel('diagnostics', DiagnosticSchema)