import { activeEffect, track, trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

export const mutableHandlers = {
  get(target, p, receiver) {
    // 访问的时候触发
    if (ReactiveFlags.IS_REACTIVE === p) {
      return true;
    }

    track(target, p);

    // 处理了this问题
    return Reflect.get(target, p, receiver);
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
