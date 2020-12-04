/**
 * 将fs转成promise
 */

let fs = require('fs')

function promise(fn){
    return function(...args){
        return new Promise((resolve,reject)=>{
            fn(...args,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
}

function promises(obj){
    // fs是一个对象
    for(let key in obj){
       if(typeof obj[key] === 'function'){
           obj[key] = promise(obj[key])
       }
    }
}

promises(fs)


fs.readFile('./age.text','utf8').then(data=>{
    console.log(data)
})