'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = (val) => val !== null && typeof val === 'object';
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isString = (val) => typeof val === 'string';
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

let uid = 0;
const effectStack = [];
let activeEffect;
const targetMap = new WeakMap();
function effect(fn, options = {}) {
    // 创建响应式effect
    const effect = createReactiveEffect(fn, options);
    // console.log(effect.id,'effect')
    if (!options.lazy) {
        effect();
    }
    return effect;
}
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        // 防止不停的更改属性导致死循环
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect);
                activeEffect = effect; // 记录当前的effect
                return fn(); // 执行用户传递的fn -> 取值操作
            }
            finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid++; // 用于做标识的
    effect._isEffect = true; // 标识是响应式effect
    effect.raw = fn;
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
function track(target, type, key) {
    // 如果不在effect中取值，则无需记录
    if (activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
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
function trigger(target, type, key, newValue, oldValue) {
    const depsMap = targetMap.get(target);
    if (!depsMap) { // 属性没有对应的effect
        return;
    }
    const effects = new Set();
    const add = (effectToAdd) => {
        if (effectToAdd) {
            effectToAdd.forEach(effect => {
                if (effect !== activeEffect) {
                    effects.add(effect);
                }
            });
        }
    };
    // 如果修改的是长度
    if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            if (key == 'length' || key >= newValue) {
                add(dep);
            }
        });
    }
    else {
        if (key !== void 0) {
            add(depsMap.get(key));
        }
        switch (type) {
            case "add" /* ADD */:
                //  给数组新增属性，直接触发length即可
                if (isArray(target)) {
                    if (isIntegerKey(key)) {
                        add(depsMap.get('length'));
                    }
                }
                break;
        }
    }
    effects.forEach(effect => {
        effect();
    });
}

const get = createGetter();
const readonlyGet = createGetter(true);
const set = createSetter();
/**
 *
 * @param isReadonly 只读
 * @param shallow 浅响应
 */
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        // 如果是仅读的无需收集依赖
        if (!isReadonly) {
            track(target, "get" /* GET */, key);
        }
        // 浅响应无需返回代理对象
        if (shallow) {
            return res;
        }
        // 取值时候,将返回值转为代理
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const oldValue = target[key];
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (!hadKey) {
            trigger(target, "add" /* ADD */, key, value);
        }
        else if (hasChanged(value, oldValue)) {
            // 修改属性
            trigger(target, "set" /* SET */, key, value);
        }
        return result;
    };
}
const mutableHandlers = {
    get, set
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`);
        return true;
    }
};

const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandlers) {
    //  1.如果不是对象直接返回
    if (!isObject(target)) {
        return target;
    }
    //  获取缓存对象
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const existingProxy = proxyMap.get(target);
    // 2. 代理过了,直接返回
    if (existingProxy) {
        return existingProxy;
    }
    // 3. 代理的核心
    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
}
function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}

exports.effect = effect;
exports.reactive = reactive;
exports.readonly = readonly;
exports.trigger = trigger;
//# sourceMappingURL=reactivity.cjs.js.map
