let Write = require('./write')
let fs =require('fs')


/**
 * flags <string> 参阅支持的文件系统标志。默认值: 'w'。
encoding <string> 默认值: 'utf8'。
fd <integer> 默认值: null。
mode <integer> 默认值: 0o666。
autoClose <boolean> 默认值: true。
emitClose <boolean> 默认值: false。
start <integer>
 */
// new Write(buffer,{
//     flags:'w',
//     encoding:'utf8',
//     fd:3,
//     mode:0o666,
//     autoClose:true,
//     emitClose:false,
//     start:0

// })

//返回一个可写流
let ws = new Write('./1.txt',{
    flags:'w',
    highWaterMark:2,
  

})
ws.write("1111")
ws.write("2222")
ws.write("3333")


ws.on('drain',()=>{
    console.log("ccc")
})



/*
//只能放 字符串 数字 buffer 
let flag = ws.write("cccccccc1")
console.log(flag)
flag = ws.write("cccccccc2")
console.log(flag)
flag = ws.write("cccccccc3")
console.log(flag)

//当我们所占用的内存都写入了,会触发drain
//drain  只有当前内容写入的内容  达到了预期 超过了预期  才会触发
ws.on('drain')

ws.end();  //  ws.write +ws.close()
//write  end


*/