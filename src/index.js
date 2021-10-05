const express = require('express')
require('./db/mongoose') 
const userRouter = require('./routers/user_router')
const taskRouter = require('./routers/task_router')
const multer = require('multer')
const Task = require ('./models/task')
const User = require ('./models/user')
const { Mongoose } = require('mongoose');
const { ObjectID } = require('bson');
const { response, request, application } = require('express');
const e = require('express');
//----------------------------------------------

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/))
        {
            return cb(new Error('Invalid file type. We support Word documents for this operation only'))

        }
        cb(undefined, true);
    }
})

app.post('/upload', upload.single('the_upload'), (req, res) => {
    res.send();
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.listen( port, () => {
    console.log('listening on port ' + port);
})

