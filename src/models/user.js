const mongoose = require('mongoose');
const {default: validator} = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('unable to log in');
        
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('unable to log in')

    }

    return user;

}

// hashing
userSchema.pre('save', async function (next) {
    const user = this;
    console.log('just before saving')
    //isModified tells us if the field has been changed. Useful for if we want the password to be hased only after user creation or change pass.
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    //this is to tell the function that we're done with the pre-function, and to proceed with the program
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User;