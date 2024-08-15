import { isObject } from "@core/shared";
import { activeEffect, ReactiveEffect, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";


function toReactive(value){
    if(isObject(value)){
        return reactive(value)
    }
    return value

}

class RefImpl {
    dep;
    __v_isRef=true
    // 原始用户传进来的值
    _rawValue
    // 代理的proxy
    _value;
    constructor(rawValue){
        this._rawValue = rawValue
        this._value = toReactive(rawValue)
       

    }

    get value(){
        // 用户取值的时候,做依赖收集
        if(activeEffect){
            trackEffect(this.dep || (this.dep = new Set()));
        }
        return this._value

    }
    set value(newValue){
        if(newValue!==this._rawValue){
            this._value = toReactive(newValue)
            this._rawValue = newValue
              // 用户改值的时候, 触发更新
            triggerEffect( this.dep)

           

        }

    }
}


export function ref(target){

    return new RefImpl(target)

}