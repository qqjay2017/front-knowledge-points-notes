/**
 * 实现createStore
 * 一个项目只有一个store
 * @param {*} reducer 
 * @param {*} initState 
 */

export default function createStore(reducer, initState) {
    let currentReducer  = reducer;
    let currentState = initState ;
    let listeners = []
    function getState() {
        return currentState;
    }
    function dispatch(action) {
        currentState = currentReducer(currentState, action)
        if (listeners.length) {
            listeners.forEach(listener => listener())
        }
        return action;
    }
    function replaceReducer() {}
    function subscribe(listener) {
        listeners.push(listener)
        return function unsubscribe(){// 去掉订阅的函数
            // 拿到listener在数组中的索引
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    dispatch({
        type:Symbol('init')
    })
    return {
        getState,
        dispatch,
        replaceReducer,
        subscribe
    }
}
