import reducer from './reducers'

import { createStore } from "redux";

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

// const store = createStore(reducer)

// Middleware

const store = applyMiddleware(Logger)(createStore)(reducer)

// 缓存旧的
// const oldDispatch  = store.dispatch



// 模拟日志中间件,但是这么写不规范

// store.dispatch = function (action){
//     console.log('状态改变前-----',store.getState())
//     oldDispatch(action)
//     console.log('状态改变后-----',store.getState())
// }

/**
 * Middleware签名
 * export interface Middleware {
  (api: MiddlewareAPI<D, S>): (
    next: Dispatch<AnyAction>
  ) => (action: any) => any
}
 * @param {*} store 
 */

function Logger(middlewareAPI){
    console.log(middlewareAPI)
    return (next)=>{
        return (action)=>{
            console.log('状态改变前-----',middlewareAPI.store.getState())
            next(action)
            console.log('状态改变后-----',middlewareAPI.store.getState())
        }
    }
}

export default store;