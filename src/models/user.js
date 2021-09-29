const mongoose = require('mongoose');
const {default: validator} = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)
                throw new Error('Age must be positive')
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Email is not a valid email')
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        //minlength: 7,
        validate(value) {
            if(value.length < 7 || value.toLowerCase().includes('password'))
                throw new Error('Password must be longer than 6 characters and cannot be the word \'password\'.')
        }
    }
})

module.exports = User;