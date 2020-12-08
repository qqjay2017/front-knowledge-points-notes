function addPerson(...args:[string,number]):void{
    console.log(`Person info: ${args[0]},age,${args[1]}`)
}
// 上面和下面的实现是一样的
function  addPerson1(name:string,age:number){
    console.log(`Person info: ${name},age,${age}`)
}

// TypeScript 4.0 ⽀持为元组类型设置标签

function addPerson3(...args:[name:string,age:number]):void{
    console.log(`Person info: ${args[0]},age,${args[1]}`)
}
// 元组类型设置标签后可以更智能的提示
addPerson3('111',3)