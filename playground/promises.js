//comparing callbacks to promises
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         //callback('an error thing', undefined);
//         callback(undefined, [1,2,3,4,5])
//     }, 2000);
// }
// doWorkCallback((error, result) => {
//     if(error)
//         return console.log(error);
//     console.log(result)
// })

const doWorkPromise = new Promise( (resolve, reject) => {
    setTimeout(() => {
        //resolve([5,2,1,3,5]);
        reject('somethin is missin stranger')
    }, 2000);
})

doWorkPromise.then((result) =>{
    console.log('Success', result)
}).catch((error) => {
    console.log('error', error)
})

//the call goes as such:
//promise -> pending -> fulfilled || rejected