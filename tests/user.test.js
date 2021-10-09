const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Task = require('../src/models/task')

const testUser1 = {
    name: 'test',
    email: 'test@gmail.com',
    password: 'test1234'
}

//MAKE SURE THIS IS USING THE TEST.ENV

beforeEach(async ()=> {
    console.log('Setting up tests...');
    await User.deleteMany();
    await new User(testUser1).save()
})

afterEach(()=> {
   
})

test('should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'hugewanus',
        email: 'phatxhance@gmail.com',
        password: 'hugewanus'
    }).expect(201)
})

test('logging in a valid user', async () => {
    await request(app).post('/users/login').send({
        email: testUser1.email,
        password: testUser1.password
    }).expect(200)
})

test('logging in an invalid user', async()=> {
    await request(app).post('/users/login').send({
        email: 'noexist@gmail.com',
        password: 'noexistpass'
    }).expect(404)
})