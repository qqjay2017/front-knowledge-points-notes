let fs = require('fs')
let path = require('path')
let EventEmitter = require('events')
// let util = require('util')

// util.inherits(readStream,events)

//offset 是 buffer 中开始写入的偏移量。
class readStream extends EventEmitter {

    constructor(filename, options = {}) {
        super()
        /**
         * 写类 要将属性都挂在实例上,这样可以保证其他原型方法上使用这些属性 
         */
        this.filename = filename

        this.flags = options.flags || 'r'
        this.encoding = options.encoding
        this.mode = options.mode || 438
        this.autoClose = options.autoClose || true
        this.start = options.state || 0;
        this.end = options.end
        this.highWaterMark = options.highWaterMark || 64 * 1024; //默认64k
        this.pos = this.start;
        this.open();
        this.on('newListener', function (type) {
            if (type == 'data') { //用户监听了data事件
                this.read()
            }
        })
    }

    open() {
        fs.open(this.filename, this.flags, (err, fd) => {
            if (err) {
                return this.emit('error')
            }
            this.fd = fd;
            this.emit('open', fd)

        })
    }

    read() { //等待open订阅到了才执行,不然会在open之前执行
        if (typeof this.fd !== 'number') {
            return this.once('open', this.read)
        }

        //每次都产生新的buffer
        let buffer = Buffer.alloc(this.highWaterMark)
        fs.read(this.fd, buffer, 0, this.highWaterMark, this.pos,  (err, bytesRead)=> {
            if (bytesRead) { //没读完
                this.pos += bytesRead;
                this.emit('data', buffer)
                this.read()
            } else { //读完了
                this.emit('end')
                this.close()

            }
        })

    }
    close() {
        fs.close(this.fd,  ()=> {
            this.emit('close')
        })
    }

    // read() {
    //     fs.open(this.filename, function (err, fd) {
    //         

    //         function next() {
    //             fs.read(fd, buffer, 0, this.buffer.length, readOffset, function (err, bytesRead, _buffer) {
    //                 //bytesRead  实际独到的字节
    //                 if (bytesRead) {
    //                     readOffset += _buffer.length
    //                     console.log(_buffer)
    //                     next()
    //                 } else {
    //                     //没了就关闭
    //                     fs.close(fd)
    //                 }
    //             })
    //         }

    //         next()

    //     })
    // }

}

module.exports = readStream;