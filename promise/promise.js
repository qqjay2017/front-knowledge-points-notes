//http://www.javascriptpeixun.cn/course/1196/task/54759/show

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECT = 'REJECT'

//因为所有的promise都遵循这个规范,规定这里的写法应该兼容所有的promise
//To run [[Resolve]](promise, x), perform the following steps:
//https://promisesaplus.com/
const resolvePromise = (promise2, x, resolve, reject) => {
    //判断x的值
    if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>"))
    }
    let called; //调用的状态,做屏蔽,为了不调用多次
    //判断函数或者对象
    // if x is an object or function,
    if ((typeof x === 'object' && x != null )|| typeof x === 'function') {
        
        try {
            //Let then be x.then
            let then = x.then; //取then有可能报错,
            if (typeof then === 'function') { //如果有then且then是函数

                /**
                 * first argument resolvePromise, and second argument rejectPromise, where:
                        If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
                        If/when rejectPromise is called with a reason r, reject promise with r.
                 */

                then.call(x,
                    y => { //y可能还是一个promise
                        if (called) {
                            return
                        }
                        called = true; //防止多次调用成功和失败
                        // resolve(y) //采用成功的结果向下传递
                        resolvePromise(promise2, y, resolve, reject); //只到解析出来的结果是一个普通值为止
                    },
                    r => {
                        if (called) {
                            return
                        }
                        called = true
                        reject(r) //采用失败的结果向下传递

                    }
                )

            } else {
                // x:{then:1}
                resolve(x)
            }
        } catch (error) {
            //失败直接走catch,有可能还能调用成功
            /**
             * esolvePromise and rejectPromise are called, or multiple calls to the same argument are made, 
             *  the first call takes precedence, and any further calls are ignored.
             */
            if (called) {
                return
            }
            called = true
            reject(error)

        }
    } else {
        //普通值,直接让promise2成功
       
        resolve(x)
    }

}

class Promise {
    constructor(executor) {

        //维护状态
        this.status = PENDING;
        //成功的结果
        this.value = undefined;
        //失败的结果
        this.result = undefined;
        //成功的回调函数的数组
        this.onfulfilledCallbacks = []
        //失败的回调函数的数组
        this.onrejectedCallbacks = []

        //成功函数
        let resolve = (value) => {
            //屏蔽调用
            if (this.status === PENDING) {

                this.value = value
                //成功后改变状态
                this.status = RESOLVED
                //执行订阅
                this.onfulfilledCallbacks.forEach(fn => fn())
            }
        }

        //失败函数

        let reject = (result) => {
            if (this.status == PENDING) {

                this.result = result
                this.status = REJECT
                this.onrejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            //Promise一执行,执行器就执行
            executor(resolve, reject)


        } catch (e) {
            // 如果发生了错误 ,等价于调用了reject方法
            reject(e)

        }
    }

    then(onfulfilled, onrejected) { //then有两个参数,调then的时候就已经知道成功失败

        /**
         * 处理没传的情况  onfulfilled ,onrejected 是可选函数
         * 
         */
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        }


        //一旦then就new Promise,然后将其返回,这样就可以链式调用
        let promise2 = new Promise((resolve, reject) => {


            //处理同步
            if (this.status === RESOLVED) {
                setTimeout(() => { //宏任务

                    try {
                        let x = onfulfilled(this.value)

                        //判断x的值  => promise2的状态
                        // 提供一个公共方法
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        //如果抛出异常,直接走reject
                        reject(e)
                    }

                }, 0);
            }
            if (this.status == REJECT) {
                setTimeout(() => { //宏任务
                    try {
                        let x = onrejected(this.result)


                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {

                        reject(e)
                    }
                }, 0);
            }

            //处理异步
            if (this.status == PENDING) {
                //发布订阅
                this.onfulfilledCallbacks.push(() => {
                    setTimeout(() => { //宏任务
                        try {
                            let x = onfulfilled(this.value)


                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
                this.onrejectedCallbacks.push(() => {
                    setTimeout(() => { //宏任务
                        try {
                            let x = onrejected(this.result)


                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {

                            reject(e)
                        }
                    }, 0);
                });
            };

        });


        return promise2;
    }
}

/**
 * 测试代码
 */

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise