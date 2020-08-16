const fs = require('fs')
const path = require('path')


// 发布订阅模式

let events = {
    dataSource: [],
    arr: [],
    on(callback) { // 订阅
        this.arr.push(callback)
    },
    emit(data) { // 发布
        this.dataSource.push(data)
        this.arr.forEach(fn => fn(this.dataSource))
    }
}

events.on(function(dataSource) {
    console.log(dataSource, '订阅')
})

fs.readFile(path.join(__dirname, './name.text'), 'utf8', (err, data) => {
    events.emit(data)
})

fs.readFile(path.join(__dirname, './age.text'), 'utf8', (err, data) => {
    events.emit(data)
})


// 发布订阅  和观察者的区别

// 没关系    有关系