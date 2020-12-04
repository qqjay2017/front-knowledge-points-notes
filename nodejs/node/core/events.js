function EventEmitter() {
    //这样创建时没有原型链的
    this._events = Object.create(null);

}
//{'cry:[fn...]}
EventEmitter.prototype.on = function (eventName, callback) {
    // this是Girl,判断实例上是否有此属性
    if (!this._events) this._events = Object.create(null);


    if (eventName !== 'newListener') {
        let listener = this._events['newListener']
        if (listener) {
            //如果有newListener就触发newListener
            this.emit('newListener', eventName)
        }
    }

    let stack = this._events[eventName] || []
    stack.push(callback)
    this._events[eventName] = stack


}

EventEmitter.prototype.emit = function (eventName, ...args) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn(...args)
        })
    }

}
EventEmitter.prototype.once = function (eventName, callback) {
    //先绑定  触发后 删除
    const one = (...args) => {
        callback(...args);
        this.off(eventName, one)
    }
    one.l = callback
    this.on(eventName, one)
}

// 删除数组中的某一项
EventEmitter.prototype.off = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(item => {
            return item !==  callback && 
             item.l !== callback
        })
    }
}




module.exports = EventEmitter