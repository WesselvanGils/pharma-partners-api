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
    firstName: {
        type: String,
        required: [true, 'A patient needs to have a firstName.'],
    },
    lastName: {
        type: String,
        required: [true, 'A patient needs to have a lastName.'],
    },
    adress: {
        type: String,
        required: [true, 'A patient needs to have an address.'],
    },
    prefix: {
        type: String,
        required: [true, 'A patient needs to have a prefix.'],
    },
    patientNumber: {
        type: String,
        required: [true, 'A patient needs to have a patient number.'],
    },
    gender: {
        type: String,
        required: [true, 'A patient needs to have a gender.'],
    },
    dateofbirth: {
        type: Date,
        required: [true, 'A patient needs to have a date of birth.'],
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
    doktor: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        autopopulate: true,
    }
})

PatientSchema.plugin(mongooseFieldEncryption, { fields: ["BSN", "phonenumber", "adress"], secret: process.env.SERVER_SECRET_MONGOOSE  });

PatientSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('patients', PatientSchema)