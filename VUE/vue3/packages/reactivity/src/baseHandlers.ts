import { hasChanged, hasOwn, isArray, isIntegerKey, isObject } from "@vue3/shared"
import { track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { reactive, readonly } from "./reactive"

const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const shallowSet = createSetter(true)

/**
 * 
 * @param isReadonly 只读
 * @param shallow 浅响应
 */
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        // 总是可以通过Reflect对应的方法获取默认行为。
        const res = Reflect.get(target, key, receiver)

        // 如果是仅读的无需收集依赖
        if (!isReadonly) {

            track(target, TrackOpTypes.GET, key)
        }
        // 浅响应无需返回代理对象
        if (shallow) {
            return res
        }
        // 取值时候,将返回值转为代理
        if (isObject(res)) {

            return isReadonly ? readonly(res) : reactive(res)
        }
        return res
    }
}

function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const oldValue = target[key]
        // hadKey 判断是否是已有的
        const hadKey = isArray(target) && isIntegerKey(key)
            ?
            Number(key) < target.length
            :
            hasOwn(target, key)
        const result = Reflect.set(target, key, value, receiver)
        if (!hadKey) {
            trigger(target, TriggerOpTypes.ADD, key, value)
        } else if (hasChanged(value, oldValue)) {
            // 修改属性
            trigger(target, TriggerOpTypes.SET, key, value, oldValue)
        }
        return result
    }
}

export const mutableHandlers = {
    get, set
}
export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`)
        return true
    }
}

export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
}

export const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set(target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`)
        return true;
    }
}