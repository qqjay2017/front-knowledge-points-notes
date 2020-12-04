# react-middleware

> react-middleware的重点是控制dispatch
> 中间件的机制可以让我们改变数据流，实现如异步 action ，action 过滤，日志输出，异常报告等功能。

```js
// 模拟日志中间件,但是这么写不规范

store.dispatch = function (action){
    console.log('状态改变前-----',store.getState())
    oldDispatch(action)
    console.log('状态改变后-----',store.getState())

}

```

## applyMiddleware

`applyMiddleware(middleware:Middleware)`

```js
const store = applyMiddleware(Logger)(createStore)(reducer)
```

## Middleware

 * Middleware签名

```ts
export interface Middleware {
  (api: MiddlewareAPI<D, S>): (
    next: Dispatch<AnyAction>
  ) => (action: any) => any
}
```

 * Middleware标准写法

```js
function Logger(middlewareAPI){
    return (next)=>{
        return (action)=>{
            console.log('状态改变前-----',middlewareAPI.store.getState())
            next(action)
            console.log('状态改变后-----',middlewareAPI.store.getState())
        }
    }
}
```

 * 实现单个applyMiddleware

```js
/**
 * 克里化
 * @param {*} middleware 
 */
function applyMiddleware(middleware){
    return (createStore)=>{
        return (reducer)=>{
            let store = createStore(reducer) 
            let oldDispatch = store.dispatch;
            store.dispatch =  middleware({
                 store,
                 dispatch:store.dispatch
             })(oldDispatch)
            return store
        }
    }
}
```


* 支持多个中间件

```js
/**
 * 
 * @param {*} middleware 
 */
function applyMiddleware(...middlewareArr){
    return (createStore)=>{
        return (reducer)=>{
            let store = createStore(reducer) 
            let oldDispatch = store.dispatch;
            const middlewareAPI = {
                store,
                dispatch:store.dispatch
            }
            middlewareArr =  middlewareArr.map(middleware=>middleware(middlewareAPI))
      
            // store.dispatch = middleware1( middleware2(oldDispatch))
            let dispatch = compose(...middlewareArr)(oldDispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
```

* 组合函数

```js
/**
 * 组合函数
 * @param  {...any} funcs 
 */
function compose(...funcs) {
    return funcs.reduce((a, b,index) => {
        
        // a(b  顺序是正和反的区别
        return (...args) =>{
            return  a(b(...args))
        }
    })
}
```

官方写法

```js
function applyMiddleware(...middlewareArr){
    return (createStore)=>{
        return (reducer)=>{
            let store = createStore(reducer) 
        
            const middlewareAPI = {
                getState: store.getState,
                // dispatch指向改造后的dispatch方法,如果你希望在中间件重新派发流程就需要这个
                dispatch:(action)=>store.dispatch(action)
            }
            let chain =  middlewareArr.map(middleware=>middleware(middlewareAPI))
      
            // store.dispatch = middleware1( middleware2(oldDispatch))
            // 第一个进去是官方的,出来一个自己的
            let dispatch = compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
```

## 别人的中间件

#### promise

> https://github.com/pburtchaell/redux-promise-middleware/blob/HEAD/docs/introduction.md


#### thunk

> https://github.com/reduxjs/redux-thunk

```
With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extends the store's abilities, and lets you write async logic that interacts with the store.

Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.
```

* What’s a thunk?!

```
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;
```