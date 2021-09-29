const mongoose = require('mongoose');
const {default: validator} = require('validator');
//--------------------------------------------------------------
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    tags: {
        type: Array,
        default: []
    }
})

module.exports = Task;
