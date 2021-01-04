// ts中的接口的特性
const tomato = {
    size: 100,
    taste: 'sour',
    color: 'red'
};
let arr1 = [1, 'a', {}];
let arr2 = { 0: 'asa', 1: 12131, 3: {} };
console.log(arr1);
class Speak {
    constructor() {
        this.name = '123';
    }
    speak() {
        throw new Error("Method not implemented.");
    }
}
// 5.接口表示类的实例
class Person {
    // name:string;
    // 构造器参数加一个public,等于上面定义了
    constructor(name) {
        this.name = name;
        this.name = name;
    }
}
let createClass = (clazz, name) => {
    return new clazz(name);
};
let r = createClass(Person, '111');
console.log(r.name);
export {};
//# sourceMappingURL=9.2%E6%8E%A5%E5%8F%A3%E7%9A%84%E4%BD%BF%E7%94%A8.js.map