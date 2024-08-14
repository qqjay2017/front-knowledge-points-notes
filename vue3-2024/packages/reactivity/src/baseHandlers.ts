import { isObject } from "@core/shared";
import { activeEffect, track, trigger } from "./effect";
import { reactive, ReactiveFlags } from "./reactive";

export const mutableHandlers = {
  get(target, p, receiver) {
    // 访问的时候触发
    if (ReactiveFlags.IS_REACTIVE === p) {
      return true;
    }

    track(target, p);

    // 处理了this问题
    const r = Reflect.get(target, p, receiver);
    if (isObject(r)) {
      // 只有用户取值的时候，才会进行二次代理
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
  },
};
