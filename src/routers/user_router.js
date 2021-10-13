const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const path = require ('path')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')
//---------------------------------------------------------
const router = new express.Router()

/**helper function to log to console. Provides formatting with date and time*/
const logToConsole = (message) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    console.log(date + '/' + time + ': ' + message)
}

/**lets users upload an avatar, rescaled */
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
         {
            return cb(new Error('Only .jpeg, .jpg, or .png fiels are supported'))
         }
         cb(undefined, true)
    }
})

//upload image
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
   
    const buffer = await sharp(req.file.buffer).png().resize({width: 250, height: 250}).toBuffer()
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

//delete user avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

//view avatar
router.get('/users/:id/avatar',  async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
          throw new Error('No avatar image');
        }
        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send(e);
    }
})

//create users 
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.cookie('auth_token',token);
        sendWelcomeEmail(user.email, user.name);
        //res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'))
        res.status(201).send({user, token});
        logToConsole('successful creation of user ' + JSON.stringify(user))
    } catch(e) {
        console.log(e);
        logToConsole('bad creation of user from request ' + JSON.stringify( req.body))
        res.status(400).send('This email already has an associated account with it.');
    };
})

//log in users
router.post('/users/login', async (req, res) => {
    try {
        const user =  await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie('auth_token', token)
        logToConsole('successful login from user ' + user.email + ' with token ' + token )
        res.send({user, token});
    } catch (e) {
        logToConsole('bad login request from ' + req.body.email)
        res.status(404).send('Invalid email or password');
    }

})

//log out users
router.post('/users/logout', auth, async (req, res) => {
    try {
        //this filters the user token array to contain things that are not that token.
        req.user.tokens = req.user.tokens.filter((token) => {return token.token != req.token});
        await req.user.save();
        logToConsole('user ' + req.user.email + ' has logged out. ' + req.token + ' removed.');
        res.send('You have logged out.');
    } catch (e) {
        logToConsole('Internal error from path POST/users/logout with error' + JSON.stringify(e))
        res.status(500).send(e);
    }
})

//log out all of a user's tokens
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        logToConsole('user' + req.user.email + ' has logged out of all devices')
        res.send('You have successfully logged out of all signed in devices');
    } catch (e) {
        logToConsole('Internal error from path POST/users/logoutall with error' + JSON.stringify(e))
        res.status(500).send(e);
    }
})

//[deprecated] get all users (NOT SAFE)
//middleware runs first, then if next executes the rest of the function does
router.get('/users', async(req, res) => {
    logToConsole('deprecated request to get all users.')
    res.status(410).send('This route is no longer supported.')
})

// a user can get their profile
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
    logToConsole('user ' + req.user.email + 'successfully queried their own profile.')
    }
)

//get one user by ID
router.get('/users/:id', async (req, res) => {
    res.status(410).send('This route is no longer supported')
})


//update users
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedArray = ['name', 'password', 'email', 'age']
    const isValid = updates.every((update) => allowedArray.includes(update))
    if(!isValid) {
        return res.status(400).send({'error': 'invalid update params'})
    }
    try {
        logToConsole('attempting to update user' + req.user.email + 'with params ' + JSON.stringify(req.body));
        //this method is used instead to have access to the middleware, which findByIdAndUpdate bypasses.
        // simply iterate through the two arrays and apply them
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        logToConsole('success!')
        res.send(req.user);
    } catch (e) {
        logToConsole('Error from request: ' + JSON.stringify(req.body))
        res.status(400).send(e);
    }
})

//delete users
router.delete('/users/me', auth, async (req, res) => {
    try {
        logToConsole('user ' + req.user.email + ' has requested profile deletion...');
        sendCancelEmail(req.user.email, req.user.name);
        await req.user.remove();
        res.send('Profile deleted. This cannot be undone.');
        logToConsole('successful deletion');

    } catch (e) {
        logToConsole('server error from request ' + JSON.stringify(req.body));
        res.status(500).send(e);
    }
})

module.exports = router;