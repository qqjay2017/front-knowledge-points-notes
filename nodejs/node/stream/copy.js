// let ReadStream = require('./readStream')
// let Write = require('./write')

// let rs= new ReadStream('./name.txt',{start:0})
// // rs.read()

// let ws = new Write('./age.txt',{
    
// })



// rs.on('data',(data)=>{
//    let flag =  ws.write(data)
//    if(!flag){
       
//    }
// })

/**
 * 
 * 
 * pipe  管道
 * 
 * 可以直接将可读流的数据导入到可写流中
 * 
 * 无法监视到读取的内容,而且此方法是异步的...没有回调
 * 
 */


 let fs = require('fs')

 fs.createReadStream('./name.txt').pipe(fs.createWriteStream('./age.txt'))

 /**
  * 追加文件
  * 
  * fs.appendFile()  fs.writeFile + flag 'a'
  * 
  */


