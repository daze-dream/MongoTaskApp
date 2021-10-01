const express = require('express')
require('./db/mongoose') 
const User = require('./models/user.js')
const Task = require('./models/task.js');
const userRouter = require('./routers/user_router')
const taskRouter = require('./routers/task_router')
const { Mongoose } = require('mongoose');
const { ObjectID } = require('bson');
const { response, request } = require('express');
const e = require('express');
//----------------------------------------------

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen( port, () => {
    console.log('listening on port ' + port);
})