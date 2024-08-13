import { isObject } from "@core/shared";
import { mutableHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
    IS_REACTIVE="__v_isReactive"
}



const reactiveMap = new WeakMap();

export function reactive(target){
    if(!isObject(target)){
        return target
    }
    // 放进来一个被代理过的proxy实例的情况
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }
    // 缓存一下代理过的对象,下一次再进行代理的时候,直接拿出来用就可以
    if(reactiveMap.has(target)){
        return reactiveMap.get(target)
    }

    const proxy = new Proxy(target,mutableHandlers)

    reactiveMap.set(target,proxy)

    return proxy

}