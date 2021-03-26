/**
 * commonJs简称CJS
 * 在node中，每一个文件都是一个单独的模块
 * commonJs核心变量：exports module.exports require
 * Node中实现commonJs的本质就是对象的引用赋值
 */

// const obj = require('./4.2foo')

// const info = obj

// info.age = 19

// console.log(obj)

/**
 * nodule.exports 和exports 有什么关系和区别
 * 
 * 1.commonJs中是没有module.exports的概念的
 * 2.但是为了实现模块的导出,Node中使用的是Module的类,每一个模块都是Module的一个实例
 * 也就是module
 * 3.所以在Node中真正用于导出的其实根本不是exports,而是module.exports
 * 4.所以module才是导出的真正实现者
 */

const { getName } = require('./4.module.js')

const name = getName('common')

module.exports = {
    name
}