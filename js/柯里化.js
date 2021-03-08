/**
 * 柯里化使用闭包返回一个函数
 * curry的主要工作是将被返回函数的参数进行排序
 * @param {*} fn 
 * @returns 
 */

function curry(fn){
    var args = Array.prototype.slice.call(arguments,1)
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments)
        var finalArgs = args.concat(innerArgs)
        return fn.apply(null,finalArgs)
    }
}

function add(num1,num2){
    return num1+num2
}
const curriedAdd =  curry(add,5)
console.log(curriedAdd(3))