import { isFunction } from "@core/shared";
import {
  activeEffect,
  ReactiveEffect,
  trackEffect,
  triggerEffect,
} from "./effect";

// 内部有一个变量,控制是否要重新执行,dirty,
// 默认是true,用户取值会执行此方法,拿到返回结果并且缓存起来,将dirty变成false
// 再次取值,如果dirty是false,就去拿缓存的结果了
// 如果依赖的值变化了,会再次更新dirty变成true,在取值的时候,就会执行,拿到新值

class ComputedRefImpl {
  dep = undefined;
  effect;
  _dirty = true;
  _setter;
  // 意味着有这个属性,需要用.value来取值
  __v_isRef = true;
  // 缓存的值
  _value = undefined;
  constructor(getter, setter) {
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
    // 计算属性是在effect中使用,需要让计算属性收集这个effect
    if (activeEffect) {
      // 用户取值发生依赖收集
      trackEffect(this.dep || (this.dep = new Set()));
    }
    if (this._dirty) {
      // 并且把取到的值缓存起来
      this._value = this.effect.run();
      this._dirty = false;
    }
    return this._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}

const noop = () => {};
export function computed(getterOroptions) {
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
