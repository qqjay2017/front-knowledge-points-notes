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
             * result.value 返回一个effect {type:'',payload:''}
             */
            runEffect(result.value,next)
        }
    }

    function runEffect(effect,next){
        console.log(effect,'effect')
        /**
         * { payload:{   pattern: "ASYNC_ADD"},type: "TAKE" }
         */
        if(effect){
            const effectRunner = effectRunnerMap[effect.type]
            effectRunner &&  effectRunner(env,effect.payload,next,{runEffect})
        }else {
            next()
        }

    }
}