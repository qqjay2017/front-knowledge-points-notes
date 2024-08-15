
import { isFunction, isObject } from "@core/shared";
import { ReactiveEffect } from "./effect";
import { isReactive } from "./reactive";


function traverse(source, s = new Set()) {


    if (!isObject(source)) {
        return source
    }
    if (s.has(source)) {
        return source
    }
    s.add(source);
    // 考虑循环引用的问题,Set来解决
    for (let key in source) {
        traverse(source[key], s)
    }
    return source
}
/**
 * 
 * @param source 
 * @param cb 
 * @param options immediate deep
 */


export function doWatch(source, cb, options: any = {}) {
    // 最终都处理成函数
    let getter;

    if (isReactive(source)) {
        // 对象的话,要做一个深度遍历,只有访问属性才会收集依赖
        getter = () => traverse(source)

    } else if (isFunction(source)) {
        getter = source
    } else {
        getter = () => source
    }



    
    let oldValue
    let cleanup

    const onCleanup = (userCb)=>{
        cleanup = userCb

       
    }
    const job = () => {
       
       
        if (cb) {
            // watch api
            // 内部要调用watch的回调
            let newValue = effect.run()

            if(cleanup){
                cleanup()
                 
            }
            cb && cb(newValue, oldValue, onCleanup)
            oldValue = newValue;
        } else {
            // watchEffct
            effect.run()

        }
    };
    const effect = new ReactiveEffect(getter, job);
    if (options && options.immediate) {
        // 默认执行一次
        return job()
    }
     oldValue = effect.run()
}

/**
 * watch本身就是一个effect+自定义scheduler调度函数
 * @param source 
 * @param cb 
 * @param options 
 */

export function watch(source, cb, options: any = {}) {
    doWatch(source, cb, options)
}
