import { isArray, isIntegerKey, isMap } from "@vue3/shared";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

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

function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect(): unknown {
        if(!effect.active){
            return options.scheduler ? undefined : fn()
        }
        // 防止嵌套effect导致死循环
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
    // 如果修改的是长度
    if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            if (key == 'length' || key >= (newValue as number)) {
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