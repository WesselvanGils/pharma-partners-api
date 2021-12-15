const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const getModel = require('./model_cache')

const PatientSchema = new Schema({
    BSN: {
        type: String,
        required: [true, 'A employee needs to have a firstname.'],
    },
})

PostSchema.plugin(mongooseFieldEncryption, { fields: ["BSN"], secret: "some secret key" });


module.exports = getModel('patients', PatientSchema)