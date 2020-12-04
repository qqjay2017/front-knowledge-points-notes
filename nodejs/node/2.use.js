/**
 * process,   -- 进程
 * 'global',
  'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',
  'queueMicrotask',
  'clearImmediate',
  'setImmediate'
 * 
 * 
 */

//  console.log(Object.keys(process))

// 1. node区分平台
// console.log(`此平台是 ${process.platform}`);
// console.log(process.platform)
/**
 * 2.argv    参数列表,可执行参数
 * 第一个是node的可执行文件路径
 * 第二个参数是当前路径
 * 
 * 使用tj commander可以帮我们实现解析参数的功能
 * https://www.npmjs.com/package/commander
 */

/*
const program = require('commander');
//监听命令,追加命令
program.on('--help', function () {
    console.log("my-help")
})
//自动配置属性对应的功能
program
    .option('-d, --debug', 'output extra debugging')
    .option('-p, --port <value>', 'set my port');

//自动执行命令
program.command('create').action(()=>{
    console.log("csdfsdfsd")
})
//版本号
program.version('0.0.1');
//解析命令
let obj = program.parse(process.argv)
// console.log(obj.port)

*/
// cwd当前工作目录


//reduce

let obj = process.argv.slice(2).reduce((m,current,index,arr)=>{
    if(current.startsWith('--')){
        m[current.slice(2)] = arr[index+1]
    }
    return m;
},{})

// console.log(obj)


////env     环境变量
//cross-env  跨平台设置环境变量
//全局安装 npm i cross-env -g
//设置  cross-env isPlay = paly node 2.test,js
// console.log(process.env)



/**
 * cwd() 当前工作目录   current Working Directory
 */

 console.log(process.cwd())

//实现一个require方法

