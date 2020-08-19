const PENDING = 'pending'; // 等待态
const FULFILLED = 'fulfilled'; // 成功态
const REJECTED = 'rejected'; // 失败态

class Promise {
    constructor(executor) {
        // this 是类自己
        this.state = PENDING; // 状态,默认等待态
        this.value = undefined; // 成功的结果
        this.reason = undefined; // 失败的原因

        this.onFulfilledCallbacks = []; //成功的回调
        this.onRejectedCallbacks = []; // 失败的回调
        // 成功的函数
        let resolve = (value) => {
            // must have a value
            if (this.state == PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        // 失败的函数
        let reject = (reason) => {
            // must have a reason
            if (this.state == PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {

            // 执行器会立即执行
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }





    then(onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected == 'function' ? onRejected : err => {
            throw err
        }


        // 每次调用then都返回一个新的Promise
        let promise2 = new Promise((resolve, reject) => {

            if (this.state == FULFILLED) {

                let x = onFulfilled(this.value);
                resolvePromise(promise2,x,resolve,reject);
            }

            if (this.state == REJECTED) {
                typeof onFulfilled == 'function' && onRejected(this.reason)
            }

            // 处理异步逻辑
            if (this.state == PENDING) {

                typeof onFulfilled == 'function' && this.onFulfilledCallbacks.push(onFulfilled);
                typeof onFulfilled == 'function' && this.onRejectedCallbacks.push(onRejected);
            }


        })
        return promise2;
    };

}

module.exports = Promise;