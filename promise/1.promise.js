/**
 * promise特点
 * 承诺  我答应你...   promise是一个类
 * 
 * 每次执行promise的时候,都会返回一个新的promise实例
 */

// 三个状态 等待态  成功态  失败态   一旦成功了就不能失败/一旦失败了就不能成功

let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
   setTimeout(() => {
       console.log("1000")
   }, 1000);
    resolve("hello")
})

promise.then(data => console.log(data ),
err => console.log(err , "err")
)
promise.then(data => console.log(data ),
err => console.log(err , "err")
)
promise.then(data => console.log(data ),
err => console.log(err , "err")
)