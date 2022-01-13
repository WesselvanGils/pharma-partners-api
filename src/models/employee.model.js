const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'A employee needs to have a firstName.'],
    },
    lastName: {
        type: String,
        required: [true, 'A employee needs to have a lastName.'],
    },
    password: {
        type: String,
        required: [true, 'A employee needs to have a password.'],
    },
    email: {
        type: String,
        required: [true, 'A employee needs to have a email.'],
        unique: [true, 'A employee needs to have a unique email'], 
    },
    employeeCode: {
        type: String,
        required: [true, 'A employee needs to have a code.'],
    },
    doctorCode: {
        type: String,
        required: [true, 'A employee needs to have a doctorscode.'],
    },
    roles: {
        type: String,
        enum: ['Huisarts', 'HuisartsAssisentent', 'POH'],
        default: 'Huisarts',
    }
})



module.exports = getModel('employees', EmployeeSchema)