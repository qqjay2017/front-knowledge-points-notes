import { isFunction } from "@vue3/shared";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

class ComputedRefImpl {
    private _value;
    private _dirty = true; // 默认是脏值
    public readonly effect;
    public readonly __v_isRef = true;
    constructor(getter, private readonly _setter) {
        this.effect = effect(getter, {
            lazy: true,// 计算属性特性
            scheduler: () => {
                if (!this._dirty) {// 依赖属性变化时
                    this._dirty = true   // 标记为脏值，触发视图更新
                    trigger(this, TriggerOpTypes.SET, 'value');
                }
            }
        })
    }

    get value(){
        if(this._dirty){
            this._value = this.effect()
            this._dirty = false
        }
        // 进行属性依赖收集
        track(this,TrackOpTypes.GET,'value')
        return this._value
    }
    set value(newVal){
        this._setter(newVal)
    }
}

export function computed<T>(getterOrOptions) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions
        setter = () => {
            console.warn('computed value is readonly')
        }
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }
    return new ComputedRefImpl(getter, setter)
}