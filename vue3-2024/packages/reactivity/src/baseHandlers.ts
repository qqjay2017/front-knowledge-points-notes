import { activeEffect, track } from "./effect"
import { ReactiveFlags } from "./reactive"

export const mutableHandlers = {
    get(target,p,receiver){
        console.log(p,'p111 ')
        // 访问的时候触发
        if(ReactiveFlags.IS_REACTIVE===p){
            return true
        }


        track(target,p)
       
      

        // 处理了this问题
        return Reflect.get(target,p,receiver)
    },
    set(target ,p, newValue, receiver){

       

        return  Reflect.set(target ,p, newValue, receiver)
    }
}