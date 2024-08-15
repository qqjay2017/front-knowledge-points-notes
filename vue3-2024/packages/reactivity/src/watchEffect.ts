
import { doWatch } from "./watch"


/**
 * watchEffect就是一个effect
 * 有了watchEffect,就不需要写依赖的数据了
 * 默认watchEffect 会立即执行,会让用到的响应式数据,收集当前的effect
 * @param effect 
 */

export function watchEffect(effect,options:any={}){
    doWatch(effect,null,options)
}