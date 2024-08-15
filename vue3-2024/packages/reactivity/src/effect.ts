export let activeEffect; // 当前的effect

/**
 * run在收集依赖之前清理依赖,避免无用的旧依赖触发函数执行
 * @param effect
 */
function cleanupEffect(effect) {
  // 每次执行effect之前,我们应该清理effect中依赖的所有属性
  let { deps } = effect;
  for (let i = 0; i < deps.length; i++) {
    //删除set里面的effect实例
    deps[i].delete(effect);
  }
  // 清空effect实例中的deps数组
  effect.deps.length = 0;
}

export class ReactiveEffect {
  // 依赖项
  public deps = [];
  // 是否激活
  public active = true;
  public parent = undefined;
  constructor(public fn, private scheduler?:Function) {}
  run() {
    if (!this.active) {
      // 未激活,直接执行
      return this.fn();
    }

    try {
      this.parent = activeEffect;
      activeEffect = this;
      cleanupEffect(this);
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = undefined;
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
    }
  }
}

// 依赖收集就是把当前的effect变成全局的,稍后取值的时候,可以拿到这个全局的effect
export function effect(fn, options: any = {}) {
  // 后面的组件更新都是基于这个scheduler来实现的
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // 默认让响应式的effect执行一次
  _effect.run();

  // 保证 _effect执行的时候,this是当前对象
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

const targetMap = new WeakMap();

export function track(target, key) {
  if (!activeEffect) {
    //取值操作没有在effect中
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  trackEffect(dep);
}

export function trackEffect(dep) {
  if(!dep){
    return 
  }
  let shouldTrack = !dep.has(activeEffect);

  if (shouldTrack) {
    dep.add(activeEffect);

    activeEffect.deps.push(dep);

    // 一个属性对应多个effect,一个effect对应多个属性
  }
}

export function triggerEffect(dep) {
  if(!dep){
    return 
  }
  const effects = [...dep];
  effects.forEach((effect) => {
    // 避免死循环,重新执行effct时候,会将当前的effect放在全局上
    if (activeEffect !== effect) {
      if (!effect.scheduler) {
        effect.run();
      } else {
        effect.scheduler();
      }
    }
  });
}

/**
 * 触发刷新
 * @param target
 * @param key
 * @param newValue
 * @param oldValue
 * @returns
 */
export function trigger(target, key, newValue, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  if (dep) {
    triggerEffect(dep);
  }
}
