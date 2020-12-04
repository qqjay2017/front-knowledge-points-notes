// ts中的装饰器
// 扩展属性和方法
// https://www.tslang.cn/docs/handbook/decorators.html
// 开启装饰器     "experimentalDecorators": true,   

// 类装饰器
function modifier(clazz:Function){
    clazz.prototype.say = function(){
        console.log('say')
    }
}

// 属性装饰器
function toUpCase(target:any,key:string){
    let value = target[key];
    Object.defineProperty(target,key,{
        get(){
          return   (value.toString() as string).toUpperCase()
        },
        set(newVal){
           
            value =  newVal;
        }
    })
}

// 静态属性装饰器  和属性装饰器一样
function staticDec(target:any,key:string){
    let value = target[key]
   Object.defineProperty(target,key,{
       get(){
           return (value as string).toUpperCase()
       }
   })
}
// 方法装饰器
function enumerable(value:boolean){
    return function(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        descriptor.enumerable = value;
    }
}

// 参数装饰器

function required(target:Object, propertyKey: string | symbol,parameterIndex:number){
    console.log(target,propertyKey,parameterIndex)
}

@modifier   // 语法糖,只是为了简单一点
class Person {
    say!:Function
    @toUpCase
    name:string = 'zf';
    @staticDec
    static context:string='staticContext'
    @enumerable(false)
    getName(@required p1: string){

    }
}

const p = new Person()
console.log(p)


 export {}