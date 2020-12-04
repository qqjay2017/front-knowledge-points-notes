
let p = new Promise((resolve,reject)=>{
    resolve(1000)
})

let promise2 = p.then(()=>{
    return promise2;
})
