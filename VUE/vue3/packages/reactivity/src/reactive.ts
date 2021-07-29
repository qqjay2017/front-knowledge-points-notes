import { isObject } from '@vue3/shared'
import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export const enum ReactiveFlags {
    SKIP = '__v_skip',
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly',
    RAW = '__v_raw'
}

export const reactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()

function createReactiveObject(target, isReadonly: boolean, baseHandlers) {
    //  1.如果不是对象直接返回
    if (!isObject(target)) {
        return target
    }
    //  获取缓存对象
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const existingProxy = proxyMap.get(target)
    // 2. 代理过了,直接返回
    if (existingProxy) {
        return existingProxy
    }
    // 3. 代理的核心
    const proxy = new Proxy(target, baseHandlers)
    proxyMap.set(target, proxy)
    return proxy

}

export function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers)
}

export function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers)
}

export function toRaw<T>(observed: T) {
    return (
        (observed && toRaw(observed[ReactiveFlags.RAW])) || observed
    )
}