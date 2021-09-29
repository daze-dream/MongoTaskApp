const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(a < 0 || b < 0)
                return reject('numbers must be nonnegative')
            resolve(a+b);
        }, 1000)
    })
}

const doWork = async () => {
    const sum = await add(1,6);
    const sum2 = await add(sum, 8);
    const sum3 = await add(sum2, 77);
    return sum3;
}

doWork().then((r) => {
    console.log('result:', r);
}).catch((e) => {
    console.log('error: ' , e);
})