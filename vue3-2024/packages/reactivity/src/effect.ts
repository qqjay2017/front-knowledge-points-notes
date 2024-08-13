export let  activeEffect;// 当前的effect

class ReactiveEffect{
    // 依赖项
    public deps=[]
    // 是否激活
   public  active=true
   public parent = undefined;
    constructor(public fn){

    }
    run(){
        if(!this.active){
            // 未激活,直接执行
           return  this.fn()
        }

        try{
            this.parent = activeEffect
            activeEffect = this
          return   this.fn()
        }
        finally{
            activeEffect = this.parent 
            this.parent = undefined
        }

      

      







    }
}

// 依赖收集就是把当前的effect变成全局的,稍后取值的时候,可以拿到这个全局的effect
export function effect(fn){

  const _effect =   new ReactiveEffect(fn);
  // 默认让响应式的effect执行一次
  _effect.run()
    
}

const targetMap = new WeakMap()

export function track(target,key){
    if(!activeEffect){ //取值操作没有在effect中
        return 
    }
    let  depsMap = targetMap.get(target)
    if(!depsMap){
        targetMap.set(target,(depsMap = new Map()))
    }
    let  dep = depsMap.get(key)
    if(!dep){
         depsMap.set(key,(dep = new Set()))
    }

    let shouldTrack = !dep.has(activeEffect); 

    if(shouldTrack){
        dep.add(activeEffect)

        activeEffect.deps.push(dep);
        console.log( activeEffect.deps," activeEffect.deps")

        // 一个属性对应多个effect,一个effect对应多个属性
    }
   
    
   
     
}