import * as effectTypes from "./effectTypes";



function runTakeEffect(env, {pattern}, cb){
    const matcher = input =>  input.type === pattern
    env.channel.take(cb, matcher);
}

function runPutEffect(env, {action}, cb){
    const result = env.dispatch(action);
    cb(result)
}

const effectRunnerMap  = {
    [effectTypes.TAKE]:runTakeEffect,
    [effectTypes.PUT]:runPutEffect
}
export default effectRunnerMap;