// ts中的接口的特性

//1. 多个同名的接口会合并,会破坏原接口

interface IVegetables {
    taste: string,
    color: string
}

// interface IVegetables {
//     size:number
// }


// 2.接口可以继承,不会改变原有方法

interface ITomato extends IVegetables {
    readonly size: number;// 仅读属性
    price?: number;           // 可选属性
    [propKey: string]: any;       // 自定义属性

}

const tomato: ITomato = {
    size: 100,
    taste: 'sour',
    color: 'red'
}


//3.接口表示数组,可索引接口

interface IArr {
    [key:number]:any
}

let arr1:IArr = [1,'a',{}]
let arr2:IArr = {0:'asa',1:12131,3:{}}
console.log(arr1)


// 4.接口可以被类实现

interface Speakable {
    name:string,
    speak():void    // 表述类的原型方法,表示不关心方法的返回值,而不是返回值为空,可以在实现中任意指定返回类型
}

class Speak implements Speakable {
    name: string = '123'
    speak(): string {
        throw new Error("Method not implemented.")
    }
    
}


// 5.接口表示类的实例

class Person {
    // name:string;
    // 构造器参数加一个public,等于上面定义了
    constructor(public name:string ){
        this.name = name
    }
}

interface IClazz<T> {      // 实例的类型
    new(name:string):T,  // 表示可以new
}

let createClass = <T>(clazz:IClazz<T>,name:string)=>{
    return new clazz(name)
}

let r = createClass<Person>(Person,'111')
console.log(r.name)

// 6.引入泛型




export { }