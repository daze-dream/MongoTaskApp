const express = require('express')
const Task = require('../models/task.js');

const router = new express.Router()

// add new task
router.post('/tasks', async(req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);

        console.log( date + '/' + time + ': Successful save task from request: ', req.body)
    } catch (e) {
        console.log( date + '/' + time +': Error from request: ', req.body)
        res.status(400).send(e);
    }
    
})



// get all tasks (NOT SAFE)
router.get('/tasks',  async(req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    try {
        const tasks =  await Task.find({});

        console.log(date + '/' + time + ': successful querying of all tasks');
        res.send(tasks);
    } catch (e) {
        console.log('internal server error', e);
        res.status(500).send()
    }

})

// get singular task
router.get('/tasks/:id', async (req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task){
            console.log('Bad task search by ID:', _id);
            return res.status(404).send('No task found');
        }

        console.log(date + '/' + time +  ': successful single task query of id ' + _id)
        res.send(task);        
    } catch (e) {
        if(e.name === 'CastError'){
            return res.status(400).send('Invalid id')
        }
        console.log( date + '/' + time +': internal server error', e);
        res.status(500).send(e)
        
    }
})

//update a task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedArray = ['description', 'completed', 'tags'];
    const isValid = updates.every((update) => allowedArray.includes(update));
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    if(!isValid) {
        return res.status(400).send({'error': 'invalid params'})
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        if(!task) {
            console.log(date + '/' + time + ': no task found for request: ', req.params.id);
            return res.status(404).send({'error': 'no such task exists'});
        }
        console.log(date + '/' + time + ': successful update of task ' + req.params.id + ' to ' + task);
        res.send(task)
    } catch (e) {
        console.log( date + '/' + time +': Error from request: ', req.body)
        res.status(400).send(e);
    }

})

//delete task by ID
router.delete('/tasks/:id', async (req, res) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) {
            console.log(date + '/' + time + ": bad task deletion request with ID: ", req.params.id);
            return res.status(404).send({'error': 'no such task exists'})
        }
        console.log(date + '/' + time + ': successful deletion of task: ', task);
        res.send(task)
    } catch (e) {
        console.log(date + '/' + time + ': server error from request', req.body);
        res.status(500).send(e);
    }
})

module.exports = router;