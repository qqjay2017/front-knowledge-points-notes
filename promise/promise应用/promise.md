# promise

### 三个状态

 - 成功态  fulfilled: 意味着操作成功完成。
 - 失败态  rejected: 意味着操作失败。
 - 等待态  pending  初始状态


 只有等待态才可以将状态变成成功或者失败

 ### 应用


es6规范中提供的一个类
每个promise需要提供一个执行器函数


```js
let promise1 = new Promise((resolve, reject) => { /* executor */
    console.log('promise1开始执行')
    setTimeout(() => {
        // resolve('foo')
    }, 300);
})

promise1.then((value) => {
    console.log(value)
})

console.log(promise1)
```


##### executor执行器函数

- executor是带有 resolve 和 reject 两个参数的函数 。
- Promise构造函数执行时立即调用executor 函数
- resolve 和 reject 两个函数作为参数传递给executor
- resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。
- executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。
- 如果在executor函数中抛出一个错误，那么该promise 状态为rejected。executor函数的返回值被忽略


##### then方法

pending 状态的 Promise 对象可能会变为fulfilled 状态并传递一个值给相应的状态处理方法，也可能变为失败状态（rejected）并传递失败信息。当其中任一种情况出现时，Promise 对象的 `then` 方法绑定的处理方法（handlers ）就会被调用

then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争

因为 `Promise.prototype.then` 和  `Promise.prototype.catch` 方法返回promise 对象， 所以它们可以被链式调用。



##### 静态方法

`Promise.all(iterable)`


        这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。


`Promise.allSettled(iterable)`

        等到所有promises都完成（每个promise返回成功或失败）。
        返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。


`Promise.any(iterable)`


        接收一个Promise对象的集合，当其中的一个promise 成功，就返回那个成功的promise的值。

`Promise.race(iterable)`

        当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。


`Promise.reject(reason)`

        返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法

`Promise.resolve(value)`

        返回一个状态由给定value决定的Promise对象。如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。通常而言，如果你不知道一个值是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。



## Promise 原型

#### 方法   

`Promise.prototype.catch(onRejected)`

`Promise.prototype.then(onFulfilled, onRejected)`

`Promise.prototype.finally(onFinally)`

