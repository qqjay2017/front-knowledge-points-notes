// packages/reactivity/src/effect.ts
var activeEffect;
function cleanupEffect(effect2) {
  let { deps } = effect2;
  for (let i = 0; i < deps.length; i++) {
    deps[i].delete(effect2);
  }
  effect2.deps.length = 0;
}
var ReactiveEffect = class {
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
    // 依赖项
    this.deps = [];
    // 是否激活
    this.active = true;
    this.parent = void 0;
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      cleanupEffect(this);
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = void 0;
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
    }
  }
};
function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
var targetMap = /* @__PURE__ */ new WeakMap();
function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */ new Set());
  }
  trackEffect(dep);
}
function trackEffect(dep) {
  if (!dep) {
    return;
  }
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function triggerEffect(dep) {
  if (!dep) {
    return;
  }
  const effects = [...dep];
  effects.forEach((effect2) => {
    if (activeEffect !== effect2) {
      if (!effect2.scheduler) {
        effect2.run();
      } else {
        effect2.scheduler();
      }
    }
  });
}
function trigger(target, key, newValue, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  if (dep) {
    triggerEffect(dep);
  }
}

// packages/shared/src/index.ts
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isFunction(value) {
  return typeof value === "function";
}

// packages/reactivity/src/baseHandlers.ts
var mutableHandlers = {
  get(target, p, receiver) {
    if ("__v_isReactive" /* IS_REACTIVE */ === p) {
      return true;
    }
    track(target, p);
    const r = Reflect.get(target, p, receiver);
    if (isObject(r)) {
      return reactive(r);
    }
    return r;
  },
  set(target, p, newValue, receiver) {
    let oldValue = target[p];
    const r = Reflect.set(target, p, newValue, receiver);
    if (oldValue !== newValue) {
      trigger(target, p, newValue, oldValue);
    }
    return r;
  }
};

// packages/reactivity/src/reactive.ts
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
  return ReactiveFlags2;
})(ReactiveFlags || {});
function isReactive(target) {
  return !!(target && target["__v_isReactive" /* IS_REACTIVE */]);
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
    return target;
  }
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target);
  }
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}

// packages/reactivity/src/computed.ts
var ComputedRefImpl = class {
  constructor(getter, setter) {
    this.dep = void 0;
    this._dirty = true;
    // 意味着有这个属性,需要用.value来取值
    this.__v_isRef = true;
    // 缓存的值
    this._value = void 0;
    this._setter = setter;
    this.effect = new ReactiveEffect(getter, () => {
      this._dirty = true;
      if (this.dep) {
        triggerEffect(this.dep);
      }
    });
  }
  // 执行才取值,类的属性访问器
  get value() {
    if (activeEffect) {
      trackEffect(this.dep || (this.dep = /* @__PURE__ */ new Set()));
    }
    if (this._dirty) {
      this._value = this.effect.run();
      this._dirty = false;
    }
    return this._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
};
var noop = () => {
};
function computed(getterOroptions) {
  let onlyGetter = isFunction(getterOroptions);
  let getter;
  let setter;
  if (onlyGetter) {
    getter = getterOroptions;
    setter = noop;
  } else {
    getter = getterOroptions.get;
    setter = getterOroptions.set || noop;
  }
  if (!getter) {
    return;
  }
  const computedRefImpl = new ComputedRefImpl(getter, setter);
  return computedRefImpl;
}

// packages/reactivity/src/watch.ts
function traverse(source, s = /* @__PURE__ */ new Set()) {
  if (!isObject(source)) {
    return source;
  }
  if (s.has(source)) {
    return source;
  }
  s.add(source);
  for (let key in source) {
    traverse(source[key], s);
  }
  return source;
}
function doWatch(source, cb, options = {}) {
  let getter;
  if (isReactive(source)) {
    getter = () => traverse(source);
  } else if (isFunction(source)) {
    getter = source;
  } else {
    getter = () => source;
  }
  let oldValue;
  let cleanup;
  const onCleanup = (userCb) => {
    cleanup = userCb;
  };
  const job = () => {
    if (cb) {
      let newValue = effect2.run();
      if (cleanup) {
        cleanup();
      }
      cb && cb(newValue, oldValue, onCleanup);
      oldValue = newValue;
    } else {
      effect2.run();
    }
  };
  const effect2 = new ReactiveEffect(getter, job);
  if (options && options.immediate) {
    return job();
  }
  oldValue = effect2.run();
}
function watch(source, cb, options = {}) {
  doWatch(source, cb, options);
}

// packages/reactivity/src/watchEffect.ts
function watchEffect(effect2, options = {}) {
  doWatch(effect2, null, options);
}

// packages/reactivity/src/ref.ts
function toReactive(value) {
  if (isObject(value)) {
    return reactive(value);
  }
  return value;
}
var RefImpl = class {
  constructor(rawValue) {
    this.__v_isRef = true;
    this._rawValue = rawValue;
    this._value = toReactive(rawValue);
  }
  get value() {
    if (activeEffect) {
      trackEffect(this.dep || (this.dep = /* @__PURE__ */ new Set()));
    }
    return this._value;
  }
  set value(newValue) {
    if (newValue !== this._rawValue) {
      this._value = toReactive(newValue);
      this._rawValue = newValue;
      triggerEffect(this.dep);
    }
  }
};
function ref(target) {
  return new RefImpl(target);
}
var ObjectRefImpl = class {
  constructor(target, key) {
    this.__v_isRef = true;
    this.defaultValue = void 0;
    this._key = "";
    this._object = target;
    this._key = key;
  }
  get value() {
    return this._object[this._key];
  }
  set value(newValue) {
    this._object[this._key] = newValue;
  }
};
function toRef(target, key) {
  return new ObjectRefImpl(target, key);
}
function toRefs(object) {
  const ret = {};
  for (let key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
function proxyRefs(objectWithRef) {
  return new Proxy(objectWithRef, {
    get(target, key, receiver) {
      const v = Reflect.get(target, key, receiver);
      if (v["__v_isRef"]) {
        return v.value;
      }
      return v;
    },
    set(target, key, newValue, receiver) {
      const oldValue = target[key];
      if (oldValue["__v_isRef"]) {
        oldValue.value = newValue;
        return true;
      }
      let v = Reflect.set(target, key, newValue, receiver);
      return v;
    }
  });
}
export {
  ReactiveEffect,
  ReactiveFlags,
  activeEffect,
  computed,
  doWatch,
  effect,
  isReactive,
  proxyRefs,
  reactive,
  ref,
  toRef,
  toRefs,
  track,
  trackEffect,
  trigger,
  triggerEffect,
  watch,
  watchEffect
};
//# sourceMappingURL=reactivity.esm.js.map
