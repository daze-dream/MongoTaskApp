const mongoose = require('mongoose')
const User = require('../../src/models/user')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId();
const testUser1 = {
    _id: userOneId,
    name: 'test',
    email: 'test@gmail.com',
    password: 'test1234',
    tokens: [{
        token: jwt.sign({_id: userOneId.toString()}, process.env.JWT_SECRET)

    }]
}

const setupDB = async() => {
    console.log('Setting up tests...');
    await User.deleteMany();
    await new User(testUser1).save()
}

module.exports = {
    userOneId,
    testUser1,
    setupDB
}