/**
 * 检测数据类型
 * typeof   基础类型,   不能判断object,array,null
 * Object.prototype.toString.call   主流
 * instanceof   
 * constructor
 * @param {*} content 
 * @param {*} type 
 */


// function isType(content, type) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }



// console.log(isType('hello', 'String'))

// 很容易把String写错   柯里化....

function isType(type) { // type会保留在当前的上下文中
    return function(content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
}

// 柯里化

let isString = isType('String');

console.log(isString('hello'))