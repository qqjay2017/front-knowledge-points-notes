import effectRunnerMap from "./effectRunnerMap";

export default function proc(env, iterator){
    next()
    function  next(arg, isErr) {
        let result;
        if(isErr){
            result = iterator.throw(arg)
        }else {
            result = iterator.next(arg)
        }
        if(!result.done){
            // 没结束就一直走  CO
            /**
             * 让runEffect决定要不要继续往下走
             * next 
             */
            runEffect(result.value,next)
        }
    }

    function runEffect(effect,next){
        // console.log(effect,'effect')
        /**
         * TAKE 的情况
         * { payload:{   pattern: "ASYNC_ADD"},type: "TAKE" }
         * PUT的情况
         * {    payload:{action:{ type:'add'}  },
         *      type: "PUT" }
         */
        // console.log(effect)
        if(effect){
            const effectRunner = effectRunnerMap[effect.type]
            effectRunner &&  effectRunner(env,effect.payload,next,{runEffect})
        }else {
            // 没结果就往下走
            next()
        }

    }
}