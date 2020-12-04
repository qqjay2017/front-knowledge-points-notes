const str = "test..."
console.log("aaaa")
 module.exports = str
// console.log(exports===this)  //true
// console.log(exports, require, module, __filename, __dirname)


//导出的不用写法
//  1. this.a = str
//  2.exports.a = str
//改变exports.a也可以改变module.exports
//  3.module.exports = str


/**
 * 它不支持两种导出,都有的话默认支持module.exports
 * 
 */
// module.exports = str
// exports.a = str