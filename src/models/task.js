const mongoose = require('mongoose');
const {default: validator} = require('validator');
//--------------------------------------------------------------
const taskSchema = new mongoose.Schema( {
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)



module.exports = Task;
