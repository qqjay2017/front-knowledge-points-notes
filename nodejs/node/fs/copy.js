/**
 * 防止内存占用过高,,需要读取一点,写入一点
 * 
 * 异步嵌套过深....
 * 
 * 解耦:发布订阅
 */

let fs = require('fs')

function copy(source, target, callback) {
    let buffer = Buffer.alloc(15)
    let readOffset = 0
    let writeOffset = 0
    fs.open(source, 'r', function (err, fd) {

        fs.open(target, 'w', function (err, wFd) {
            //异步的co用next
            function next() {
                fs.read(fd, buffer, 0, buffer.length, readOffset, function (err, byteRead) {
                    readOffset +=byteRead
                    //byteRead  实际上读取到的字节
                    if (byteRead) {
                        fs.write(wFd, buffer, 0, byteRead, writeOffset, function (err, written) {
                            writeOffset+=written
                            next()
                        })
                    } else {  //读不到了关闭
                        fs.close(fd,function(err){})
                        fs.close(wFd,function(err){})
                        callback();
                    }

                })
            }
            next()



        })
    })

}

copy('./1.txt', './target.txt', function () {
    console.log("操作成功")
})