const PENDING = 'pending'; // 等待态
const FULFILLED = 'fulfilled'; // 成功态
const REJECTED = 'rejected'; // 失败态




class Promise {
    constructor(executor) {
        // this 是类自己
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject.call(this, error)
        }
    }

    state = PENDING; // 状态,默认等待态
    value = null; // 成功的结果
    reason = null; // 失败的原因
    onFulfilled = []; //成功的回调
    onRejected = []; // 失败的回调
    resolve(value) {
        // this默认是undefined
        // must have a value
        if (this.state == PENDING) {
            this.value = value;
            this.state = FULFILLED;
            this.onFulfilled.forEach(fn=>fn(this.value))
        }
    }
    reject(reason) {
        // must have a reason

        if (this.state == PENDING) {
            this.reason = reason;
            this.state = REJECTED;
            this.onRejected.forEach(fn=>fn(this.reason))
        }
    }


    then(onFulfilled, onRejected) {
        
        if (this.state == FULFILLED) {
            typeof onFulfilled == 'function' && onFulfilled(this.value);
        }

        if (this.state == REJECTED) {
            typeof onFulfilled == 'function' && onRejected(this.reason)
        }

        // 处理异步逻辑
        if(this.state == PENDING){
            typeof onFulfilled == 'function' && this.onFulfilled.push(onFulfilled);
            typeof onFulfilled == 'function' && this.onRejected.push(onRejected);
        }

    }

}

module.exports = Promise;