const a = require('a')
console.log(module.paths)

/**
 * 加载顺序问题:不写后缀默认先 尝试找文件
 * 
 * 文件找不到,继续尝试找文件夹下面的index.js
 * 
 * 文件名不是index: 把文件夹变成一个包,需要创建一个json来描述这个包的入口是哪里
 * package.json
 * {  "main":"inde.js" }
 * 各个版本有差异
 * 
 * 如果没有路径,可能是核心模块,
 * 
 * 会认为是第三方模块,会找node_modules
 * 
 * module.paths
 * 一级一级往上找
 * 
 * [
  'f:\\zf\\web_top\\node\\module\\node_modules',
  'f:\\zf\\web_top\\node\\node_modules',
  'f:\\zf\\web_top\\node_modules',
  'f:\\zf\\node_modules',
  'f:\\node_modules'
]
 * 
 */

