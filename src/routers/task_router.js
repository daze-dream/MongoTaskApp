const express = require('express')
const Task = require('../models/task.js');
const auth = require('../middleware/auth')

const router = new express.Router()

// add new task
router.post('/tasks', auth ,async(req, res) => {
    //const task = new Task(req.body);
    const task = new Task({...req.body, ownerId:req.user._id});
    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
    
})


// get all tasks for user
//the route will go /tasks?options=value
// limit and skip options
// option of sortby=createdAt_asc/desc
router.get('/tasks', auth,  async(req, res) => {
    const match = {}
    const sort = {}
    console.log(req.query)
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        console.log(parts)
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        console.log(sort)

    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks);
    } catch (e) {
        console.log('internal server error', e);
        res.status(500).send()
    }

})

// get singular task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        //fetch a task that matches both the task ID and the user ID of that task.
        console.log(req.user._id);
        const task = await Task.findOne({_id, ownerId: req.user._id})
        if(!task){
            console.log('Bad task search by ID:', _id);
            return res.status(404).send('No task found');
        }

        res.send(task);        
    } catch (e) {
        if(e.name === 'CastError'){
            return res.status(400).send('Invalid id')
        }
        res.status(500).send(e)
        
    }
})

//update a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedArray = ['description', 'completed', 'tags'];
    const isValid = updates.every((update) => allowedArray.includes(update));
    if(!isValid) {
        return res.status(400).send({'error': 'invalid params'})
    }
    try {
        const task = await Task.findOne({_id: req.params.id, ownerId: req.user._id});
        if(!task) {
            return res.status(404).send({'error': 'no such task exists'});
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task)
    } catch (e) {
        console.log( date + '/' + time +': Error from request: ', req.body)
        res.status(400).send(e);
    }

})

//delete task by ID
router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, ownerId: req.user._id});
        if(!task) {
            return res.status(404).send({'error': 'no such task exists'})
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;