import { stdChannel } from "./channel";
import { runSaga } from "./runSaga";

/**
 * 中间件其实就是增强了dispatch方法
 * 
 * next(action)  是调用redux提供的dispatch(action)
 */

function sagaMiddlewareFactory() {

    // 标准管道
    const channel = stdChannel()  // createSagaMiddleware
    // 一开始就执行的saga
    let boundRunSaga;
    function sagaMiddleware({ getState, dispatch }) {
        // bind 使函数变成空指针  bind第二个参数起，会依次传递给原始函数
        boundRunSaga = runSaga.bind(null, {
            channel,
            dispatch,
            getState
        })
        return function (next) {
            return function (action) {
                // next(action) 是redux中间件的标准写法
                const result = next(action)
                // 每次dispatch都要去管道找一下有没有对应的订阅
                channel.put(action);
                // 这里的 return result 是调用put 的effect 后的返回值
                return result

            }
        }
    }

    sagaMiddleware.run = (...args) => {
        boundRunSaga(...args)
    }

    return sagaMiddleware
}

export default sagaMiddlewareFactory