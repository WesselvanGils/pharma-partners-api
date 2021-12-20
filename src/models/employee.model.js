const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')


const EmployeeSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'A employee needs to have a firstname.'],
    },
    lastname: {
        type: String,
        required: [true, 'A employee needs to have a lastname.'],
    },
    password: {
        type: String,
        required: [true, 'A employee needs to have a password.'],
    },
    email: {
        type: String,
        required: [true, 'A employee needs to have a email.'],
        unique: [true, 'A employee needs to have a unique email'],
       
    }
  
})



module.exports = getModel('employees', EmployeeSchema)