const express = require('express')
require('./db/mongoose') 
const User = require('./models/user.js')
const Task = require('./models/task.js')
//----------------------------------------------

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(() => {
        console.log('Successful save from request: ', req.body)
        res.status(201).send(user);
    }).catch((e) => {
        console.log('Error from request: ', req.body)
        res.status(400).send(e);
    })
    
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(()=> {
        console.log('Successful save from request: ', req.body)
        res.status(201).send(task);
    }).catch((e)=> {
        console.log('Error from request: ', req.body)
        res.status(400).send(e);
    })
    
})

app.get('/users', (req, res) => {
    
})

app.listen( port, () => {
    console.log('listening on port ' + port);
})