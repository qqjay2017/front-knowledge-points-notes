
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

/**
 * 
 * @param {*} middleware 
 */
function applyMiddleware(...middlewareArr){
    return (createStore)=>{
        return (reducer)=>{
            let store = createStore(reducer) 
        
            const middlewareAPI = {
                getState: store.getState,
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