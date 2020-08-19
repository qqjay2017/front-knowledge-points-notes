// es6规范中提供的一个类
// 每个promise需要提供一个执行器函数(这个函数会立即执行)

const Promise = require('../手写promise/promise')



let promise1 = new Promise((resolve, reject) => { /* executor */
    console.log('promise1开始执行')
    // setTimeout(() => {
    //      resolve('foo') // 遍历数组执行
    // }, 300);
    resolve('foo')
})

promise1.then((value) => { // push进回调数组
    console.log(value) 
    return  value;
}).then((value)=>{
    console.log(value,'value')
})



