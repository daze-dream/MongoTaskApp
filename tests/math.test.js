// const { text } = require('express');
// const tipUtil = require('../src/math')

// const add = (a,b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             if(a < 0 || b < 0)
//                 return reject('numbers must be nonnegative')
//             resolve(a+b);
//         }, 1000)
//     })
// }


test('initial', () => {
    expect(1).toBe(1)
})

// test('testing tip tool', () => {
//     const tip = tipUtil.calcTip(10, .3);
//     expect(tip).toBe(3)
// })

//testing with asychronous functions

//1. with promises. done implies the test is 'complete' for async
// test('add two numbers', (done) => {
//     add(2,3).then((sum) => {
//         expect(sum).toBe(5);
//         done()
//     })
// })

// //2. with async/await
// test('add two numers with await', async () => {
//     const sum = await add(10,1)
//     expect(sum).toBe(11)
// })