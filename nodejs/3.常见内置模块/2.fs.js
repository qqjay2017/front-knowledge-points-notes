const fs = require('fs')

// 1. 文件信息

console.log(fs.statSync(__dirname))


// 2. 回调

// 3. Promise

fs.promises.stat()


/**
 * 文件标识符  File descriptors
 * 1. 在POSIX系统上,对于每一个进程,内核都维护着一张当前打开着的文件和资源的表格
 * 2. 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符
 * 3.在系统层,所有文件操作都使用这个文件描述符,来标识和跟踪每个特定的文件
 * 4.window系统使用了一个虽然不用,但是概念上类似的机制来跟踪文件资源
 * 
 */