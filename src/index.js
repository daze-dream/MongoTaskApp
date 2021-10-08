const express = require('express')
require('./db/mongoose') 
const userRouter = require('./routers/user_router')
const taskRouter = require('./routers/task_router')
const multer = require('multer')
const cookieParser = require ('cookie-parser')
const Task = require ('./models/task')
const User = require ('./models/user')
const { Mongoose } = require('mongoose');
const { ObjectID } = require('bson');
const { response, request, application } = require('express');
const e = require('express');
//----------------------------------------------

const app = express();
const port = process.env.PORT

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(userRouter)
app.use(taskRouter)
app.listen( port, () => {
    console.log('listening on port ' + port);
})

