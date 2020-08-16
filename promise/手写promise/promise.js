class Promise {
    constructor(executor) {

        this.state = 'pending'
        executor(this.resolve, this.reject)
    }

}
Promise.prototype.then = function(onFulfilled, onRejected) {

}

new Promise(() => {

})