import { isArray, isIntegerKey, isMap } from "@vue3/shared";
import { TrackOpTypes, TriggerOpTypes } from "./operations";


/**
 * effect  副作用
 * effect默认会执行一次
 * 执行的时候收集属性的依赖  effct = [name ,age]
 * 执行的时候会把用到的属性和这个effct关联起来,下次更新属性的时候,会再次执行这个effect
 * 
 */
let uid = 0;
const effectStack = []
let activeEffect: ReactiveEffect | undefined;
type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()
export const ITERATE_KEY = Symbol('')

export interface ReactiveEffect<T = any> {
    (): T;
    id: number;
    _isEffect: boolean;
    raw: () => T;
    deps: Array<Dep>;
    active: boolean;
    options: Record<string, any>;
    allowRecurse: boolean
}

export function effect(fn, options: any = {}) {

    // 创建响应式effect
    const effect = createReactiveEffect(fn, options)
    // console.log(effect.id,'effect')
    if (!options.lazy) {

        effect()
    }
    return effect

}

/**
 * 当用户取值的时候,需要将activeEffct 和属性做关连
 * 当用户更改的时候   要通过属性 找到effct 重新执行
 * @param fn 
 * @param options 
 * @returns 
 */

function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect(): unknown {

        /**
         * 执行的时候就要做一次关联--> 让属性记住这个effect
         */
        if(!effect.active){
            return options.scheduler ? undefined : fn()
        }
        // 防止嵌套effect,做一个effectStack:[],可以拿到当前的effct,利用栈模拟函数的执行过程
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect)

                activeEffect = effect  // 记录当前的effect
                return fn() // 执行用户传递的fn -> 取值操作
            } finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    } as ReactiveEffect
    effect.id = uid++; // 用于做标识的
    effect._isEffect = true; // 标识是响应式effect
    effect.raw = fn;
    effect.active = true
    effect.deps = []; // 用于收集effect对应的相关属性
    effect.options = options;
    return effect;

}
/**
 * track依赖收集
 * @param target 
 * @param type 
 * @param key 
 * @returns 
 */
export function track(target, type: TrackOpTypes, key: unknown) {

    // 如果没有activeEffect,就不收集
    if (activeEffect === undefined) {
        return
    }

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }

}

/**
 * 将需要触发的effect找到依次执行
 * @param target 
 * @param type 
 * @param key 
 * @param newValue 
 * @param oldValue 
 * @returns 
 */

export function trigger(target, type: TriggerOpTypes, key?, newValue?, oldValue?) {
    const depsMap = targetMap.get(target)

    if (!depsMap) { // 属性没有对应的effect
        return
    }
    const effects = new Set<ReactiveEffect>();
    const add = (effectToAdd: Set<ReactiveEffect> | undefined) => {
        if (effectToAdd) {
            effectToAdd.forEach(effect => {
                if (effect !== activeEffect) {
                    effects.add(effect)
                }
            })
        }
    }
    console.log(key,newValue,depsMap)
    // 如果修改的是长度(解决修改length时候的依赖收集问题)
    if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            /**
             * 1. 修改数组length,effect里面依赖数组的一个下标
             *  这时候key是数组下标  ,是需要收集的依赖
             * newValue 是数组的长度
             */
            if (key == 'length' || key >= (newValue as number)) {
                // ||  把数组的长度改小了的清理
                add(dep)
            }
        })
    } else {
        // SET | ADD | DELETE
        if (key !== void 0) {
            add(depsMap.get(key))
        }
        switch (type) {
            case TriggerOpTypes.ADD:
                //  给数组新增属性，直接触发length即可
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY))

                } else if (isIntegerKey(key)) {
                    // push的时候,length会被屏蔽,手动给length收集依赖
                    add(depsMap.get('length'))
                }
                break;

            case TriggerOpTypes.SET:
                if (isMap(target)) {
                    add(depsMap.get(ITERATE_KEY))
                }
                break;

            default:
                break;
        }
    }

    const run = (effect:ReactiveEffect)=>{
        if(effect.options.scheduler){
            effect.options.scheduler(effect)
        }else {
            effect()
        }
    }
    effects.forEach(run)
}