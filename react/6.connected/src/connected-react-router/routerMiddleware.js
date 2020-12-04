import {
    CALL_HISTORY_METHOD
} from './actions'

/**
 * action.type是 CALL_HISTORY_METHOD  的时候走这个中间件,调用history方法
 * @param {*} history 
 */


const routerMiddleware = (history) => (middlewareApi) => (next) => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
        return next(action)
    }
    const { payload:{method,args } } = action
    // console.log(args,'methodmethod')
    // console.log(history)
    history[method](...args)
}

export default routerMiddleware;