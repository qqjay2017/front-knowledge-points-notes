/**
 * 
 * fs中的stream
 * 
 * 有方向
 * 
 * 读流的好处:而且不关心整体内容
 * 
 * 我可以分段读取
 * 
 * 可读流  写流
 * 
 * fs.open  fs.read  fs.write  fs.clone   发布订阅模式  events模块
 * 
 * 
 * createReadStream(path: PathLike, 
 * options?: string | { 
 * flags?: string;   http://nodejs.cn/api/fs.html#fs_file_system_flags
 * encoding?: string;   
 * mode:  d rwx   r-x  r-x          2读  4写  1执行  777
 *          自己  组    不在组
 * autoClose: 读完是否自动关闭
 * fd?: number; mode?:
 *  number; autoClose?: 
 * boolean; start?: number;
 *  end?: number; 
 * highWaterMark?: number; }):  每次读几个
 */

 let fs = require('fs')
 let readStream = require('./readStream')
 //
 let rs =new readStream('./age.txt',{
    flags:'r',
    encoding:null,
    mode:0o666,
     autoClose:true,
     start:0,
     //end:8,      //0-5包前也包后:6个
     highWaterMark:2,
 })

 //发布订阅可以解耦合
//默认当前是暂停模式
//监听; data时间,会将流模式改为flowing流动模式
// let arr = []
//  rs.on('data',function(data){       //buffer
//      arr.push(data)

//  })

 //读取完毕,触发时间
//  rs.on('end',function(){
//      console.log(Buffer.concat(arr).toString())
//  })


//自己写的
// rs.on('open',function(fd){
//     console.log(fd)
// })
// let arr = []
// rs.on('data',function(data){
//     arr.push(data)
// })
// rs.on('end',function(){
//     console.log(Buffer.concat(arr).toString())
// })


// rs.pause();    //暂停data事件
//  


