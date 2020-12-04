/**
 * 模板引擎
 * 
 * {{}}
 * 
 * ${}
 * 
 * 核心  replace  正则
 */

//  let name = 'zf'
//  let age = 10
 
//  let str="${name}今年${age}岁了"

//  //  正则分组  ()  .+ 至少一个
//  // 正则:默认  贪婪 ,尽可能的多找   非贪婪模式: ? 尽可能的多找
//  str = str.replace(/\$\{(.+?)\}/g,function(){
//      return eval(arguments[1])
//  })

//  console.log(str)


 /**
  * 模板引擎  ejs  jade...
  * 
  */
let path = require('path')
let fs = require('fs')
let str =  fs.readFileSync(path.resolve(__dirname,'index.html'),'utf8')

//   const ejs = require('ejs')

//  let newStr =  ejs.render(str,{
     
//   });


function render (str,obj){
  let head = 'let str = ""\r\nwith(obj){\r\n';
  head += "str += `"
  str = str.replace(/<%=(.+?)%>/g,function(){
    return '${'+arguments[1]+'}'
  })
  let content= str.replace(/<%(.+?)%>/g,function(){
    return '`\r\n'+arguments[1]+'\r\nstr+=`';
  })
  let tail='` \r\nreturn str}'
  // console.log(head+content+tail)

   let fn = new Function('obj',head+content+tail)
  return fn(obj)
}

/**
 * 实现原理 with  new Function  正则拼接
 */

let html = render(str,{
  array:[1,2,3,4,5,6,8,9]
})

console.log(html)


 