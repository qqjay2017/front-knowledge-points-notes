import * as effectTypes from "./effectTypes";

/**
 * 因为effect有很多种,所以做了一个map,放对应的执行方法
 * 策略模式
 * @param {*} env 
 * @param {*} param1 
 * @param {*} cb 
 */

function runTakeEffect(env, {pattern}, cb){
    // {   pattern: "ASYNC_ADD"}
    const matcher = input =>  input.type === pattern
    // 管道放东西,不接着往下走
    env.channel.take(cb, matcher);
}
// put effect执行完接着往下走
function runPutEffect(env, {action}, next){
    // put  执行redux提供dispatch
    const result = env.dispatch(action);
    next(result)
}

const effectRunnerMap  = {
    [effectTypes.TAKE]:runTakeEffect,
    [effectTypes.PUT]:runPutEffect
}
export default effectRunnerMap;