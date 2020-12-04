/**
 * 正则参考
 * 把路径转成正则
 * 1. path-to-regexp:  https://www.npmjs.com/package/path-to-regexp
 * 2.Regulex 正则可视化:    https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24 
 */

const  pathToRegexp = require("path-to-regexp");

let keys = [];

//  let  regexp= pathToRegexp('/post',keys,{end:false});

 //  /^\/post\/?(?=\/|$)/i

// console.log(regexp)
// console.log(regexp.test('/post'))
// console.log(regexp.test('/post/'))
// console.log(regexp.test('/post/a'))

console.log(pathToRegexp('https:cdn.jsdelivr.net/',keys,{end:true}))
// /(?:([^\/]+?)$/i

let reg = /(?:([^\/]+?))$/

// http://localhost:5000/npm/react-dom@17.0.1/umd/react-dom.development.js
// http://localhost:5000/npm/react-dom@17.0.1/umd/react-dom.development.min.js