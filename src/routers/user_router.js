const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.get(('/test'), (req, res) => {
    res.send('new file babeh')
})

//create users 
router.post('/users', async (req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    const user = new User(req.body);
    try{
        await user.save(); 
        res.status(201).send(user);

        console.log(date + '/' + time + ': successful creation of user: ', user)
    } catch(e) {
        res.status(400).send(e);
        console.log( date + '/' + time + ': Bad new user creation from: ', req.body)
    };
})

//get all users (NOT SAFE)
router.get('/users',  async(req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    try {
        const user = await User.find({});

        console.log(date + '/' + time + ': successful querying of all users');
        res.send(user);
    } catch (e) {
        console.log( date + '/' + time + ': internal server error', e);
        res.status(500).send(e);
        
    }
})

//get one user by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    try {
        const user = await User.findById(_id);
        if(!user){
            console.log(date + '/' + time + ': Bad user search by ID: ', _id);
            return res.status(404).send('No user found');
        }

        console.log(date + '/' + time + ': successful query of user with ID' + _id)
        res.send(user)
    } catch (e) {
        if(e.name === 'CastError'){
            return res.status(400).send('Invalid id')
        }
        console.log( date + '/' + time +': internal server error', e);
        res.status(500).send(e)

    }
})


//update users
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedArray = ['name', 'password', 'email', 'age']
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    const isValid = updates.every((update) => allowedArray.includes(update))
    if(!isValid) {
        return res.status(400).send({'error': 'invalid params'})
    }
    try {
        const user = await User.findById(req.params.id);
        //const user =  await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});
        if(!user) {
            console.log(date + '/' + time + ': no user found for request: ', req.params.id);
            return res.status(404).send({'error': 'no such user found'});
        }
        //this method is used instead to have access to the middleware, which findByIdAndUpdate bypasses.
        // simply iterate through the two arrays and apply them
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        console.log(date + '/' + time + ': successful update of user ' + req.params.id + ' to ' + user);
        res.send(user);
    } catch (e) {
        console.log( date + '/' + time +': Error from request: ', req.body)
        console.log(e )
        res.status(400).send(e);
    }
})

//delete users
router.delete('/users/:id', async (req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            console.log(date + '/' + time + ": bad user deletion request with ID: ", req.params.id);
            return res.status(404).send({'error': 'no such user exists'})
        }
        console.log(date + '/' + time + ': successful deletion of user: ', user);
        res.send(user)
    } catch (e) {
        console.log(date + '/' + time + ': server error from request', req.body);
        res.status(500).send(e);
    }
})

module.exports = router;