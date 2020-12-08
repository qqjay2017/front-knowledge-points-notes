
class FirstClass {
    id: number | undefined;
    constructor(id:number){
        this.id = id;
    }
}
class SecondClass {
    name: string | undefined;
}
// class GenericCreator<T> {
//     create(): T {
//         // 'T' only refers to a type, but is being used as a value here.
//         return new T();
//     }
// }

class GenericCreator<T>{
    // 重构create,参数是一个构造函数 调用该构造函数返回T  c:{new(a:number):T;
    create<T>(c:{new(a:number):T;},num:number){
        // num:number   给构造函数传参
        return new c(num)
    }
}
const creator1 = new GenericCreator<FirstClass>();
const firstClass:FirstClass = creator1.create(FirstClass,10)
console.log(firstClass.id) // 10
// 在 TypeScript 接口中，你可以使用 new 关键字来描述一个构造函数:

interface Point {
    // new 称为构造签名
    new(x: number, y: number): Point
}
// 构造签名                     可选的类型参数          可选的参数列表          可选的类型注解
// ConstructSignature:   new  TypeParametersopt  (  ParameterListopt  )  TypeAnnotationopt
