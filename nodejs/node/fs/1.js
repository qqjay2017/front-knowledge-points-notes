/**
 * fs用法   （文件系统）
 * 
 * 核心
 * 
 * 读取文件
 * fs.readFile(path[, options], callback)

    fs.readFileSync(path[, options])


    写入文件
    fs.writeFile(file, data[, options], callback)

    fs.writeFileSync(file, data[, options])
 * 
 * 
 * 采用同步时: require('./xxx')
 * 读取并拷贝文件 运行中的代码  代用异步的方式来操作,优点:非阻塞i/o  缺点:不好写
 * 
 * 写入可能会导致内存占用率过高, 淹没可用内存   硬盘考内存(考一点存一点)
 * 
 * 读一点考一点
 * 
 * node自己封装了文件流
 * 
 */

/**
 * fs.mkdir(path[, options], callback)
 * 
 * fs.stat(path[, options], callback)  判断文件在不在,err是不存在
 * 
 * fs.readDirSync   读取目录
 * 
 * 删除 目录
 * 
 *   fs.rmdir(path[, options], callback)
     fs.rmdirSync(path[, options])

   删除文件
      unlinkSync
 * 
 * 前端遍历树
 * 
 * 先序(从根开始)  中序  后序
 * 
 * 深度  广度
 */


let fs = require('fs')
let path = require('path')

//同步删除
// function rmdirSync(dir) {
//    function next(dir) {
//       //读取目录
//       let dirs = fs.readdirSync(dir)
//       //目录添上父路径
//       dirs = dirs.map(d => {
//          return path.join(dir, d)
//       })
//       //循环   遍历目录删除
//       for (let i = 0; i < dirs.length; i++) {
//          let current = dirs[i]
//          let statObj = fs.statSync(current)
//          //是文件夹
//          if (statObj.isDirectory(current)) {
//             fs.rmdirSync(current)
//          }else {     //是文件,删除
//            fs.unlinkSync(current)

//          }
//       }
//    }
//    next(dir)
//    fs.rmdirSync(dir)
// }
// rmdirSync('e')

//异步删除
//串行 先序 深度 遍历
/*
function rmdir(dir, cb) {
   //判断文件还是文件夹  'e'
   fs.stat(dir, function (err, statObj) {
      if (statObj.isDirectory()) { //是文件夹
         fs.readdir(dir, function (err, dirs) {
            dirs = dirs.map(d => {
               return path.resolve(dir, d)
            })
          
            let index = 0;

            function next() {
               if (index === dirs.length) {
                  return fs.rmdir(dir, cb)
               }

               //将儿子删除后...
               let current = dirs[index++]; //第一个目录
               rmdir(current, next) //第一个删除完调用回调,回调如果是文件夹会在进来,走index1..
            }
            next()
         })
      } else { //是文件,直接删除
         fs.unlink(dir, cb)
      }
   })
}
rmdir('e', function () {
   console.log("删除成功")
})
*/


//promise all
//并行 先序 深度 优先 
/*
function rmdir(dir, cb) {
   //判断文件还是文件夹  'e'
   fs.stat(dir, function (err, statObj) {
      if (statObj.isDirectory()) { //是文件夹
         fs.readdir(dir, function (err, dirs) {
            dirs = dirs.map(d => {
               return path.resolve(dir, d)
            })
            //先看有没有儿子,如果没有儿子,就把自己删除
            if(dirs.length===0){
               return fs.rmdir(dir,cb)
            }

            let index = 0;
            
            function done(){     //儿子都删除了的处理方式
               index ++;
               if(index === dirs.length){
                  fs.rmdir(dir,cb)
               }
            }
            //有儿子就异常删除,删完调用done
            for(let i =0;i<dirs.length;i++){
               let _dir = dirs[i]
               rmdir(_dir,done)
            }
         })
      } else { //是文件,直接删除
         fs.unlink(dir, cb)
      }
   })
}
rmdir('e', function () {
   console.log("删除成功")
})
*/

//promise 方式
// function rmdir(p) {
//    return new Promise((resolve, reject) => {
//       fs.stat(p, function (err, statObj) {
//          if (statObj.isDirectory()) {     //判断文件夹
//             fs.readdir(p, function (err, dirs) {
//                dirs = dirs.map(d => {
//                   return rmdir(path.join(p, d))
//                })
//                Promise.all(dirs).then(()=>{
//                   //删除子目录后删除自己
//                   fs.rmdir(p,resolve)
//                })
//             })
//          } else {
//              fs.unlink(p,resolve)
//          }
//       })
//    })

// }

//promise的fs 方式

// async function rmdir(p) {
//    let statObj = await fs.stat(p)
//    if (statObj.isDirectory()) {
//       let dirs = await fs.readdir(p)
//       dirs = dirs.map(d => {
//          return rmdir(path.join(p, d))
//       })
//       await Promise.all(dirs);
//       await fs.rmdir(p)
//    } else {
//       await fs.unlink(p)
//    }

// }

// rmdir('e')

//广度删除  将要删除的放在一个队列里面

function wideRmSync(p){
   let arr = [p]
   let index =0;
   let current;
   while(current=arr[index++]){
     let statObj =   fs.statSync(current)
     if(statObj.isDirectory()){
        let dirs = fs.readdirSync(current).map(d=>path.join(current,d))
        arr=[...arr,...dirs]
     }
   }

   console.log(arr)
}


wideRmSync('e')