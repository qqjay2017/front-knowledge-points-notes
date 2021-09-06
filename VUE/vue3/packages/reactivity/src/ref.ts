import { hasChanged, isArray, isObject } from "@vue3/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { reactive, toRaw } from "./reactive";

declare const RefSymbol: unique symbol
export interface Ref<T = any> {
    value: T;
    [RefSymbol]: true;
    _shallow?: boolean
}

export function isRef(r: any): r is Ref {
    return Boolean(r && r.__v_isRef === true)
}


export function ref(value?: unknown) { // // ref Api
    return createRef(value)
}

/**
 * shallowRef
 * 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。
 * @param value 
 * @returns 
 */

export function shallowRef(value) { // shallowRef Api
    return createRef(value, true);
}

/**
 * // 递归响应式
 * @param val 
 * @returns 
 */

const convert = <T extends unknown>(val: T): T =>
    isObject(val) ? reactive(val) : val


    /**
     * 借助类的属性访问器
     * ts中定义类,私有属性必须先声明才能使用
     */
class RefImpl<T> {
    private _value: T;
    // 静态标识是ref
    public readonly __v_isRef = true;
    constructor(private _rawValue: T, public readonly _shallow = false) {
        // 如果是对象的话,套一层reactive
        this._value = _shallow ? _rawValue : convert(_rawValue)
    }
    get value() {
        // 把自己作为一个依赖收集起来
        track(toRaw(this), TrackOpTypes.GET, 'value')
        return this._value
    }
    set value(newVal:T){
        if(hasChanged(toRaw(newVal),this._rawValue)){
            this._rawValue = newVal;
            this._value = this._shallow ? newVal : convert(newVal);
            trigger(toRaw(this),TriggerOpTypes.SET,'value',newVal)
        }
    }
}

function createRef(rawValue?: unknown, shallow = false) {
    if (isRef(rawValue)) {
        return rawValue
    }
    return new RefImpl(rawValue, shallow)
}

class ObjectRefImpl{
    public readonly __v_isRef = true
    constructor(private readonly _object , private readonly _key){}
    get value(){
        return this._object[this._key]
    }
    set value(newVal){
        this._object[this._key] = newVal
    }
}

export function toRef(object,key){
    return new ObjectRefImpl(object,key)
}

/**
 * 将对象中的属性转换成ref属性
 * @param object 
 * @returns 
 */

export function toRefs(object){
    const ret = isArray(object) ? new Array(object.length) : {};
    for(const key in object){
        ret[key] = toRef(object,key)
    }
    return ret;
}