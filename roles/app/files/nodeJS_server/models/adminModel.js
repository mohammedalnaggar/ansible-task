const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema ({
    email: {
        type: "string",
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Your email is not valid.'
        }
    },
    password: {
        type: "string", 
        required: true,
        minlength: 8
    }, 
    tokens: [{
        token: {
            type: "string",
            required: true
        }
    }]
})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel