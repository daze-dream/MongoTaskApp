const express = require('express')
require('./db/mongoose') 
const userRouter = require('./routers/user_router')
const taskRouter = require('./routers/task_router')
const { Mongoose } = require('mongoose');
const { ObjectID } = require('bson');
const { response, request, application } = require('express');
const e = require('express');
//----------------------------------------------

const app = express();
const port = process.env.PORT || 3000;

// app.use( (req, res, next) => {
//     //this is the middleware function that runs in between a request and a route handler.
//     // we can use this to autheticate with web tokens, using next() to proceed.
//     console.log(req.method, req.path );
//     if() {
//     } else {
//         next();
//     }
//     //next();
// })

// app.use((req, res, next) => {
//     if(req.method != '') {res.status(503).send('SITE UNDER MAINTENANCE')}
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.listen( port, () => {
    console.log('listening on port ' + port);
})

// const jwt = require ('jsonwebtoken')

// const myFunc = async () => {
//     const token = jwt.sign({_id: 'temp'}, 'bigspending', {expiresIn: '7 days'});
//     console.log(token);

//     console.log(jwt.verify(token, 'bigspending'))
// }

// myFunc();