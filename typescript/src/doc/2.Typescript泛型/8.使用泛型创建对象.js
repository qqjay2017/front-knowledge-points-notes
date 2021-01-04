"use strict";
class FirstClass {
    constructor(id) {
        this.id = id;
    }
}
class SecondClass {
}
// class GenericCreator<T> {
//     create(): T {
//         // 'T' only refers to a type, but is being used as a value here.
//         return new T();
//     }
// }
class GenericCreator {
    // 重构create,参数是一个构造函数 调用该构造函数返回T  c:{new(a:number):T;
    create(c, num) {
        // num:number   给构造函数传参
        return new c(num);
    }
}
const creator1 = new GenericCreator();
const firstClass = creator1.create(FirstClass, 10);
console.log(firstClass.id); // 10
// 构造签名                     可选的类型参数          可选的参数列表          可选的类型注解
// ConstructSignature:   new  TypeParametersopt  (  ParameterListopt  )  TypeAnnotationopt
//# sourceMappingURL=8.%E4%BD%BF%E7%94%A8%E6%B3%9B%E5%9E%8B%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1.js.map