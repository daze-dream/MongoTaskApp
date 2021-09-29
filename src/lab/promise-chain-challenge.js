require('../db/mongoose');
const Task = require('../models/task')

// Task.findByIdAndDelete('615379b353922159c47457bf')
// .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskThenCount = async(id) =>  {
    await Task.findByIdAndDelete(id);
    const count =  await Task.countDocuments({completed: false});
    return count;
}

deleteTaskThenCount('6153796166a1b20f1dfb6bf5')
.then((r) => {
    console.log(r);
}).catch((e)=>{
    console.log(e);
})