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


class ObjectRefImpl {
    __v_isRef=true
    defaultValue=undefined;
    _key=''
    _object;

    constructor(target,key){
        this._object = target;
        this._key = key

    }


    get value(){
        return this._object[this._key]
    }

    set value(newValue){
        this._object[this._key] = newValue

    }
}


export function toRef(target,key){
    return new ObjectRefImpl(target,key)
}

export function toRefs(object){
    const ret = {}
    for(let key in object){
        ret[key] = toRef(object,key)
    }
    return ret
}

export function proxyRefs(objectWithRef){
    return new Proxy(objectWithRef,{
        get(target,key,receiver){
            const v = Reflect.get(target,key,receiver)
            if(v['__v_isRef']){
                return v.value
            }
            return v
        },
        set(target,key,newValue,receiver){
            const oldValue = target[key]
            if(oldValue['__v_isRef']){
                 oldValue.value = newValue
                 return true
            }
            let v = Reflect.set(target,key,newValue,receiver)
            return v;

        }
    })

}