// es6规范中提供的一个类
// 每个promise需要提供一个执行器函数(这个函数会立即执行)
let promise1 = new Promise((resolve, reject) => { /* executor */
    console.log('promise1开始执行')
    setTimeout(() => {
        resolve('foo')
    }, 300);
})

promise1.then((value) => {
    console.log(value)
})

console.log(promise1)