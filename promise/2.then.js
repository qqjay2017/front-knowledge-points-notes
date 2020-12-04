/**
 *  1. then中传递的函数,判断成功和失败函数返回的结果
 *  2. 判断是不是promise,如果是promise 就采用他的状态
 *  3. 如果不是promise  直接将结果传递下去
 * 
 */

let Promise = require('./promise')
let p = new Promise((resolve, reject) => {
    resolve(100)
})

let promise2 = p.then(data => {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve,reject)=>{
                resolve("递归")
            }))
        }, 1000);
    })
},err=>{
    console.log(err)
})
.then(data => {
    
    console.log(data)
    resolve(data)
   
}, err => {
    console.log(err)

   reject(err)
})


// console.log(promise2)

