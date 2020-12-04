let EventEmitter = require('events');
let fs = require('fs')

class Node {
    constructor(element) {
        this.element = element
        this.next = null;
    }
}
/**
 * 链表
 */
class LinkList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    append(element) {
        let node = new Node(element)
        if (this.head == null) { //链表的头
            this.head = node
        } else {
            let current = this.head
            //一直去找next,直到某一个没有next了
            while (current.next) {
                current = current.next
            }
            //他的next就是node
            current.next = node

        }
        this.length++
    }

    get() {
        let head = this.head
        if (!head) return
        this.head = head.next
        return head.element
    }
}




module.exports = class Write extends EventEmitter {
    constructor(path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.highWaterMark = options.highWaterMark || 16 * 1024
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.encoding = options.encoding || 'utf8'
        this.mode = options.mode || 0o666
        //判断当前是否正在写
        this._writing = false
        //如果不是正在写入就讲当前内容写入链表
        this.cache = new LinkList()
        //期望值 大于等于期望值的时候,设置为true
        this.needDrain = false
        //位置偏移量
        let pos = this.start
        //用来统计写入的个数
        this.len = 0;
        // 打开文件,准备写入
        this.open();

    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {

            if (err) {
                return this.emit('error')
            }
            this.fd = fd;
            this.emit('open', fd)
        })
    }

    write(chunk, encoding = this.encoding, callback) {
        //通通转成buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length
        //写入的总大小和期望值  true = 没满
        let flag = this.len < this.highWaterMark
        this.needDrain = !flag
        
        if (this._writing) { //当前正在写,放链表
           
            this.cache.append({
                chunk,
                encoding,
                callback
            })

        } else {
            this._writing = true
            //真正的写入
            this._write(chunk, encoding, () => {
                //todo...
                callback && callback()
                this.clearBuffer(); //情况缓存里面的数据
            })
        }


        return flag

    }
    clearBuffer() { //依次从链表中清空数据
        let obj = this.cache.get()
        if (obj) {
            this._write(obj.chunk, obj.encoding, () => {
                    obj.callback && obj.callback()
                    this.clearBuffer()
            })

        } else {
             //值改回来,要在触发时间事件
             this._writing = false
            if(this.needDrain){
                //取完了
            this.needDrain = false
            this.emit('drain')
            }
           
        }

    }

    end() {

    }
    _write(chunk, encoding, cb) {
        //发布订阅模式
        if (typeof this.fd !== 'number') {
           return this.once('open', () =>  this._write(chunk, encoding, cb))
        }

        //       文件  数据   0-n            文件中的位置
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
            this.pos += written
            this.len -=written
            cb && cb()

        })
    }
}