const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Task = require('../src/models/task')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {userOneId, testUser1, setupDB} = require('./fixtures/db')

beforeEach(setupDB)

test('creating a task for valid user', async ()=> {
    const response = await request(app)
    
})