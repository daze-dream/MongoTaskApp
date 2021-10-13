const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { response } = require('../src/app')
const {userOneId, testUser1, setupDB} = require('./fixtures/db')



// const userOneId = new mongoose.Types.ObjectId();
// const testUser1 = {
//     _id: userOneId,
//     name: 'test',
//     email: 'test@gmail.com',
//     password: 'test1234',
//     tokens: [{
//         token: jwt.sign({_id: userOneId.toString()}, process.env.JWT_SECRET)

//     }]
// }

//MAKE SURE THIS IS USING THE TEST.ENV

beforeEach(setupDB)

afterEach(()=> {
   
})

test('should sign up a new user and check for their database info', async () => {
    const response = await request(app).post('/users').send({
        name: 'hugewanus',
        email: 'phatxhance@gmail.com',
        password: 'hugewanus'
    }).expect(201)

    //assertions for new user's info in database
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();

    //respone body has same values
    expect(response.body).toMatchObject({
        user:{
            name: 'hugewanus',
            email: 'phatxhance@gmail.com',
        },
        token: user.tokens[0].token
    })
    
    //expect password to be hashed
    expect(user.password).not.toBe('hugewanus')

})

test('valid user can log in, and the response token is correct', async () => {
    const response = await request(app).post('/users/login').send({
        email: testUser1.email,
        password: testUser1.password
    }).expect(200)

    //check their tokens
    const TestUser = await User.findById(userOneId)
    expect(TestUser).not.toBeNull()
    //second token because the user is already logged in when created
    expect(TestUser.tokens[1].token).toBe(response.body.token)
})

test('logging in an invalid user', async()=> {
    await request(app).post('/users/login').send({
        email: 'noexist@gmail.com',
        password: 'noexistpass'
    }).expect(404)
})

test('get user profile', async() => {
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${testUser1.tokens[0].token}`)
    .send()
    .expect(200)
})

test('user profile should not load when unauthorized', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
}) 

test('delete account for not logged in user should not work', async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('user can delete account and account is removed from DB', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${testUser1.tokens[0].token}`)
    .send()
    .expect(200)

    //the user should now not exist
    expect(await User.findById(userOneId)).toBeNull()
})

test('successful upload of an image to a User account', async ()=> {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${testUser1.tokens[0].token}`)
    .attach('avatar','./tests/fixtures/profile-pic.jpg')
    .expect(200)

    //is data stored?
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('updating valid fields for users', async() =>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${testUser1.tokens[0].token}`)
    .send({
        name: 'BIGSMELLA'
    })
    .expect(200)

    //has the name changed?
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('BIGSMELLA')
})

test('invalid paramters to update user should not work', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${testUser1.tokens[0].token}`)
    .send({
        pets: '3'
    })
    .expect(400)
})

