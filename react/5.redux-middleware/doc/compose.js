/**
 * 
 * 组合
 * 
 */

function add1(str) {
    return str + '1'
}

function add2(str) {
    return str + '2'
}

function add3(str) {
    return str + '3'
}

// 组合 (一个函数的执行结果是另一个函数的参数)
let res1 = add1(add2(add3('hello'))) // hello321
console.log(res1)

/**
 * 
 * @param  {...any} funcs 
 * reduce如果没有第二个参数initialValue,第一次循环a, b,默认是第一个和第二个元素,index从1开始算
 */

function compose(...funcs) {
     return funcs.reduce((a, b,index) => {
         
         // a(b  顺序是正和反的区别
         return (...args) =>{
             return  b(a(...args))
         }
     })
}
let composed = compose(add1, add2, add3)

let res2 = composed('world');
console.log(res2)