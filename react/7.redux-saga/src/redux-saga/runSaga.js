import proc from "./proc"


export function runSaga( { channel, dispatch, getState },rootSaga,...args) {
    // 执行rootsaga,得到一个迭代器
    const iterator = rootSaga(...args)
    const env = {
        channel,
        dispatch,
        getState
    }
    // process  迭代器执行器
    proc(env, iterator)
}