const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isObject = (val) => val !== null && typeof val === 'object';
const isFunction = (val) => typeof val === 'function';
const isMap = (val) => toTypeString(val) === '[object Map]';
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isString = (val) => typeof val === 'string';
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

/**
 * effect  副作用
 * effect默认会执行一次
 * 执行的时候收集属性的依赖  effct = [name ,age]
 * 执行的时候会把用到的属性和这个effct关联起来,下次更新属性的时候,会再次执行这个effect
 *
 */
let uid = 0;
const effectStack = [];
let activeEffect;
const targetMap = new WeakMap();
const ITERATE_KEY = Symbol('');
function effect(fn, options = {}) {
    // 创建响应式effect
    const effect = createReactiveEffect(fn, options);
    // console.log(effect.id,'effect')
    if (!options.lazy) {
        effect();
    }
    return effect;
}
/**
 * 当用户取值的时候,需要将activeEffct 和属性做关连
 * 当用户更改的时候   要通过属性 找到effct 重新执行
 * @param fn
 * @param options
 * @returns
 */
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        /**
         * 执行的时候就要做一次关联--> 让属性记住这个effect
         */
        if (!effect.active) {
            return options.scheduler ? undefined : fn();
        }
        // 防止嵌套effect,做一个effectStack:[],可以拿到当前的effct,利用栈模拟函数的执行过程
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
    effect.active = true;
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
    // 如果没有activeEffect,就不收集
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
    console.log(key, newValue, depsMap);
    // 如果修改的是长度(解决修改length时候的出发问题)
    if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            /**
             * 1. 修改数组length,effect里面依赖数组的一个下标
             *  这时候key是数组下标  ,是需要收集的依赖
             * newValue 是数组的长度
             */
            if (key == 'length' || key >= newValue) {
                // ||  把数组的长度改小了的清理
                add(dep);
            }
        });
    }
    else {
        // SET | ADD | DELETE
        if (key !== void 0) {
            add(depsMap.get(key));
        }
        switch (type) {
            case "add" /* ADD */:
                //  给数组新增属性，直接触发length即可
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                }
                else if (isIntegerKey(key)) {
                    // push的时候,length会被屏蔽,手动给length收集依赖
                    add(depsMap.get('length'));
                }
                break;
            case "set" /* SET */:
                if (isMap(target)) {
                    add(depsMap.get(ITERATE_KEY));
                }
                break;
        }
    }
    const run = (effect) => {
        if (effect.options.scheduler) {
            effect.options.scheduler(effect);
        }
        else {
            effect();
        }
    };
    effects.forEach(run);
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);
/**
 * target 原对象  key 取什么属性  receiver代理对象
 * @param isReadonly 只读
 * @param shallow 浅响应
 */
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        // 总是可以通过Reflect对应的方法获取默认行为。
        const res = Reflect.get(target, key, receiver);
        // 如果是仅读的无需收集依赖
        if (!isReadonly) {
            track(target, "get" /* GET */, key);
        }
        // 浅响应无需返回代理对象
        if (shallow) {
            return res;
        }
        // 懒递归,取值时候,将返回值转为代理,Proxy不会深度代理,
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const oldValue = target[key];
        // hadKey 判断是否是已有的
        const hadKey = isArray(target) && isIntegerKey(key)
            ?
                Number(key) < target.length
            :
                hasOwn(target, key);
        // Reflect.set 设置失败了  有返回值
        const result = Reflect.set(target, key, value, receiver);
        /**
         * 如果数组push,会走两次set  一次是    "3" "100" (push的下标和值)  一次是"length" 4 (新的长度)
         * 所以需要对数组特殊处理
         */
        // console.log(target, key, value, receiver,result,'target, key, value, receiver')
        if (!hadKey) {
            // 新增属性
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
const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
};
const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set(target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`);
        return true;
    }
};

/**
 * WeakMap 是一个弱引用,如果这个对象被销毁了,map会自动销毁掉
 * reactiveMap 目的是添加缓存
 */
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandlers) {
    //  1.如果不是对象直接返回
    if (!isObject(target)) {
        return target;
    }
    //  获取缓存对象,如果同一个对象被代理过,就不需要再代理
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
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers);
}

class ComputedRefImpl {
    _setter;
    _value;
    _dirty = true; // 默认是脏值
    effect;
    __v_isRef = true;
    constructor(getter, _setter) {
        this._setter = _setter;
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) { // 依赖属性变化时
                    this._dirty = true; // 标记为脏值，触发视图更新
                    trigger(this, "set" /* SET */, 'value');
                }
            }
        });
    }
    get value() {
        if (this._dirty) {
            this._value = this.effect();
            this._dirty = false;
        }
        // 进行属性依赖收集
        track(this, "get" /* GET */, 'value');
        return this._value;
    }
    set value(newVal) {
        this._setter(newVal);
    }
}
function computed(getterOrOptions) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = () => {
            console.warn('computed value is readonly');
        };
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
}

export { computed, effect, reactive, readonly, shallowReactive, shallowReadonly, trigger };
//# sourceMappingURL=reactivity.esm-bundler.js.map
