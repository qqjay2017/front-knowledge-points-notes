# redux-saga

- redux-saga 是一个 redux 的中间件，而中间件的作用是为 redux 提供额外的功能。
- 在 reducers 中的所有操作都是同步的并且是纯粹的，即 reducer 都是纯函数，纯函数是指一个函数的返回结果只依赖于它的参数，并且在执行过程中不会对外部产生副作用，即给它传什么，就吐出什么。
- 但是在实际的应用开发中，我们希望做一些异步的（如Ajax请求）且不纯粹的操作（如改变外部的状态），这些在函数式编程范式中被称为“副作用”。
- redux-saga 就是用来处理上述副作用（异步任务）的一个中间件。它是一个接收事件，并可能触发新事件的过程管理者，为你的应用管理复杂的流程。

## redux-saga工作原理

 - `sages` 采用 `Generator` 函数来 `yield Effects`（包含指令的文本对象）
 - `Generator` 函数的作用是可以暂停执行，再次执行的时候从上次暂停的地方继续执行
 - `Effect` 是一个简单的对象，该对象包含了一些给 `middleware` 解释执行的信息。
 - 你可以通过使用 `effects API` 如 `fork`，`call`，`take`，`put`，`cancel` 等来创建 Effect。

## saga的分类

 - root saga 立即启动saga的唯一入口
 - watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务

```js
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```

 - worker saga 做左右的工作，如调用API，进行异步请求，获取异步封装结果

## 如何使用saga进行异步操作

> redux-promise和redux-thunk也可以实现异步操作
> saga 优势

--------

## BeginnerTutorial

> https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html

## generator函数

> https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112

generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。

```js
function * gen(){
    yield 1;
}

let it = gen()

console.log(it.next())

```

#### co,也是redux-saga的实现原理

co自动next

```js
function co(gen){
    let it = gen()
    let result;
    function next(value){
        result = it.next(value);
        if(!result.done){
            next(result.value)
        }
    }
    next()
}
```


* next传参,会给`yield`的结果

```js

function * inner(){
   const inner1 =  yield 'inner1';
   console.log(inner1,'inner1') // 200 inner1
    yield 'inner2';
}

function * gen(){
  const a =   yield 1;
  console.log(a,'a')    // 100 a
    yield *inner();
    yield 2;
}

// co(gen)

const it = gen()

const v1 = it.next()
const v2 = it.next(100)
const v3 = it.next(200)

console.log(v1,v2,v3)  // { value: 1, done: false } { value: 'inner1', done: false } { value: 'inner2', done: false }

```




#### 安装

`$  npm i redux react-redux redux-saga`


#### saga api


- `take`  等待一个特定的 action,还没来的时候就会被阻塞
- `put`   发起一个action
- `delay` 等待,`call(delay,1000)`
- `call`