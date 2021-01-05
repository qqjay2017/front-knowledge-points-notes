import { stdChannel } from "./channel";
import { runSaga } from "./runSaga";

/**
 * 中间件其实就是代理了dispatch的过程
 */

function sagaMiddlewareFactory(){
   
    // 渠道
    const channel = stdChannel()  // createSagaMiddleware

    let boundRunSaga;
    function sagaMiddleware({getState,dispatch}){

        boundRunSaga = runSaga.bind(null,{
            channel,
            dispatch,
            getState
        })
        return  function (next){
            return function(action){
                // next(action) 是redux中间件的标准写法
                const result = next(action)
                channel.put(action);
                // 这里的 return result 是调用put 的effect 后的返回值
                return result

            }
        }
    }

    sagaMiddleware.run = (...args)=>{
        boundRunSaga(...args)
    }

    return sagaMiddleware
}

export default sagaMiddlewareFactory