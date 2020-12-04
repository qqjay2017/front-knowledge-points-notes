// const str = require('./a')
// console.log(str)

let path = require('path')

/**
 * __dirname ,当前文件夹路径全名
 * path.resolve()  =>  解析一个绝对路径
 * 通常 这样用      path.resolve(__dirname,"a")
 * 拼凑出一个文件的完整路径
 * 
 * 一般使用resolve,遇到 / 的时候用join
 * 
 * console.log(path.join(__dirname,'a','b','/'))  //f:\zf\web_top\node\module\a\b\
 * 
 * 取父路径      console.log(path.dirname(__dirname)) //f:\zf\web_top\node
 * 
 * 取文件名     console.log(path.basename('1.js','.js')) //1    需要告诉他抛出尾巴
 * 
 * 去后缀       path.extname('1.js') //.js
 */



 /**
  * fs中的方法一般都是由同步和异步组成  require方法是同步的
  * 
  * require  底层:
  *     1.先将文件转成绝对路径
  *     2.读取这个文件.需要增加一个函数   函数内部返回module.export
  *             内部实现靠的是vm.runInThisContext() 
  *     3.new Module  创建模块
  *         module.load  加载模块
  *         Module._extensions 代表的是一个对象,对象上放着很多方法
  *             拿到文件,进行编译
  *             Module.wrap()   -->  读完文件套一层函数
  *             然后用call去执行
  *     4.最终返回module.export
  *     3.让函数执行
  * 
  * 读取文件采用绝对路径
  */
 

  let fs = require('fs')
  //同步方法  只要node中读取文件,不存在会发生异常
  let r = fs.readFileSync(path.resolve(__dirname,'a.js'),'utf8');
  console.log(r)

  //err first  exist   异步方法被取消了


  /**
   * 调试nodejs源码
   * 
   * 1.可以再浏览器中调试  不推荐
   * https://nodejs.org/en/docs/guides/debugging-getting-started/
   * 
   * node --inspect-brk 文件名      chrome://inspect
   * 
   * 2.可以再vscode调试
   */

   /**
    * 
    * 核心模块
    * 
    * 自定义模块
    * 
    * 第三方模块
    * 
    */