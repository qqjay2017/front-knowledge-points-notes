// packages/reactivity/src/effect.ts
var activeEffect;
var ReactiveEffect = class {
  constructor(fn) {
    this.fn = fn;
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
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = void 0;
    }
  }
};
function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
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
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    console.log(activeEffect.deps, " activeEffect.deps");
  }
}

// packages/shared/src/index.ts
function isObject(value) {
  return value !== null && typeof value === "object";
}

// packages/reactivity/src/baseHandlers.ts
var mutableHandlers = {
  get(target, p, receiver) {
    console.log(p, "p111 ");
    if ("__v_isReactive" /* IS_REACTIVE */ === p) {
      return true;
    }
    track(target, p);
    return Reflect.get(target, p, receiver);
  },
  set(target, p, newValue, receiver) {
    return Reflect.set(target, p, newValue, receiver);
  }
};

// packages/reactivity/src/reactive.ts
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
  return ReactiveFlags2;
})(ReactiveFlags || {});
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
export {
  ReactiveFlags,
  activeEffect,
  effect,
  reactive,
  track
};
//# sourceMappingURL=reactivity.esm.js.map
