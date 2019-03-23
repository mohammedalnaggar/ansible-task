const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        first_name: {
            type: "string",
            required: true,
        },
        last_name: {
            type: "string",
            required: true,
        }
    },
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
    image: {
        type: "string"
    },
    tokens: [{
        token: {
            type: "string",
            required: true
        }
    }],
    books: [{
        book_id: {type:"string",ref:'book'},
        status: "string",
        user_rating: {
            type: Number,
            min: 0,
            max: 5
        }
    }]
})

//post hook for delete

const userModel = mongoose.model('user', userSchema)

module.exports = userModel