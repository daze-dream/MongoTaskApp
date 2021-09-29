const express = require('express')
require('./db/mongoose') 
const User = require('./models/user.js')
const Task = require('./models/task.js');
const { Mongoose } = require('mongoose');
const { ObjectID } = require('bson');
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

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        console.log('successful querying of all users');
        res.send(users);
    }).catch((e) => {
        console.log('internal server error', e);
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    console.log(ObjectID('615380b18a19e5d3ac4d66ab'));
    User.findById(_id).then((user) => {
        if(!user){
            console.log('Bad user search by ID: ', _id);
            return res.status(404).send('No user found');
        }
        res.send(user);
    }).catch((e) => {
        if(e.name === 'CastError'){
            return res.status(400).send('Invalid id')
        }
        console.log('internal server error', e);
        res.status(500).send(e)
    });
    console.log(req.params);
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


app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        console.log('successful querying of all tasks');
        res.send(tasks);
    }).catch((e) => {
        console.log('internal server error', e);
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if(!task){
            console.log('Bad task search by ID:', _id);
            return res.status(404).send('No user found');
        }
        console.log('successful single task query of id', _id)
        res.send(task);
    }).catch((e) => {
        if(e.name === 'CastError'){
            return res.status(400).send('Invalid id')
        }
        console.log('internal server error', e);
        res.status(500).send(e)
    });
    console.log(req.params);
})

app.listen( port, () => {
    console.log('listening on port ' + port);
})