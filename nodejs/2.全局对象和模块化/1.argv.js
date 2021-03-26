
// node ./nodejs/2.全局对象和模块化/1.argv.js age=18 ccc
// 执行node的时候，后面加上额外参数   可以在process.argv 拿到
console.log(process.argv)

/**
 * [
  '/usr/local/bin/node',
  '/Users/huangbo/front-knowledge-points-notes/nodejs/2.全局对象和模块化/1.argv.js',
  'age=18',
  'ccc'
]
 */


/**
 * 为什么是argv
 * argv 是 argument vector
 * vector 矢量的意思，在程序中表示一种数据结构
 */