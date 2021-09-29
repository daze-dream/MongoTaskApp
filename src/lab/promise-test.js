require('../db/mongoose');
const { count } = require('../models/user');
const User = require('../models/user')
//615382c98abe0a8a5e68766e

// User.findByIdAndUpdate('6154a6a1076601a0e33a7c2e', { age: 1})
// .then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}
updateAgeAndCount('6154a6a1076601a0e33a7c2e',13).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})