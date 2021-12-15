const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
require('dotenv').config()
const getModel = require('./model_cache')

const PatientSchema = new Schema({
    BSN: {
        type: String,
        required: [true, 'A patient needs to have a BSN.'],
    },
    firstname: {
        type: String,
        required: [true, 'A patient needs to have a firstname.'],
    },
    lastname: {
        type: String,
        required: [true, 'A patient needs to have a lastname.'],
    },
    adress: {
        type: String,
        required: [true, 'A patient needs to have a lastname.'],
    },
    prefix: {
        type: String,
        required: [true, 'A patient needs to have a lastname.'],
    },
    patientNumber: {
        type: String,
        required: [true, 'A patient needs to have a lastname.'],
    },
    gender: {
        type: String,
        required: [true, 'A patient needs to have a gender.'],
    },
    dateofbirth: {
        type: Date,
        required: [true, 'A patient needs to have a gender.'],
    },
    phonenumber: {
        type: String,
        required: [true, 'A patient needs to have a phonenumber.'],
    },
    medicalrecord: {
        type: Schema.Types.ObjectId,
        ref: "medicalrecords",
        autopopulate: true,
      },


})

PatientSchema.plugin(mongooseFieldEncryption, { fields: ["BSN", "phonenumber", "adress"], secret: process.env.SERVER_SECRET_MONGOOSE  });

PatientSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('patients', PatientSchema)