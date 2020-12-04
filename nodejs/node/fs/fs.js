/**
 * node自己封装了文件流
 * 
 * 提供一些列的api  自己可以控制读取和写入的个数
 */


 //1.读取

//  let buffer = Buffer.alloc(3);
 let fs = require('fs');

 //2先打开文件
 //open(path: PathLike, flags 读取还是写入的标识 r是读取: string | number, callback:  fd文件描述符号,数字类型 
//  fs.open('./1.txt','r',function(err,fd){
//      //文件描述符  buffer:当前文件读取到哪里去
//      /**
//       * function read<Buffer>(fd: number, 
//       * buffer: Buffer, 
//       * offset: number, 往buffer的哪个位置
//       * length: number, 
//       * position: number, 从当前文件的第几个位置开始读
//       * callback: (err: NodeJS.ErrnoException, 
//       * bytesRead: number真实读取到的
//       * , buffer: Buffer) => void): void
//       */
   
//     fs.read(fd,buffer,0,3,0,function(err,bytesRead,buffer){
//             //关闭
//             fs.close(fd,function(err){
//                     console.log("关闭成功")
//             })
//     });
//  })

 //2) 写入
let buffer = Buffer.from("珠峰")
fs.open('./1.txt','w',function(err,fd){
        //向1.txt文件中的第0个文职索引写入,  写入buffer  从buffer的索引3处开始写入  写入三个
        fs.write(fd,buffer,3,3,0,function(err,written,buffer){
                console.log(written)
                console.log(buffer)
        })
})

