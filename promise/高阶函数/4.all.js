// 同时读取多个文件内容,将内容组成一个数组
const fs = require('fs')
const path = require('path')



// 当out执行两次后,执行fn
let out = after(fn, 2)

function fn(arr) {
    console.log(arr)
}

function after(callback, times) {
    let arr = []
    return function(data) {
        arr.push(data)
        if (--times == 0) {
            callback(arr)
        }
    }
}

fs.readFile(path.join(__dirname, './name.text'), 'utf8', (err, data) => {
    out(data);
})

fs.readFile(path.join(__dirname, './age.text'), 'utf8', (err, data) => {
    out(data);
})