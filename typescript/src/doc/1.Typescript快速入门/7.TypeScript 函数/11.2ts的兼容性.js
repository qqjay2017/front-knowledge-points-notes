// 1.接口的兼容性
// 原理是  duck-check
function getName(animal) {
    return animal.name;
}
let p = {
    name: 'zf',
    age: 10,
    gender: 0
};
// 这样是可以的,传参的时候每会进行兼容性比较,因为Animal的属性在Person里面都有
getName(p);
// 报错:赋值的时候不会比较,会直接报错
// let a:Animal {
//     gender:0
// }
// 2.基本数据类型的兼容性
let numStr;
let str = 'zf';
// 可以,因为numStr可以容纳string和number
numStr = str;
let num2;
let str2 = 'jg';
// 可以,因为str2有toString方法
num2 = str2;
// 3.类的兼容性
var a;
(function (a_1) {
    class Animal {
    }
    class Bird extends Animal {
    }
    let a;
    let b = new Bird();
    // a可以等于b,因为b继承a,有a所有属性
    a = b;
    // b不能等于a,因为Animal没有age属性
    // b=a;
})(a || (a = {}));
let sum;
function f1(a, b) {
}
// 完全一样,可以
sum = f1;
function f2(a) {
}
// 参数少一个:可以
sum = f2;
function f3(a, b, c) {
}
let getPerson;
function g1() {
    return { name: 'zf', age: 10 };
}
// 可以,完全一样
getPerson = g1;
function g2() {
    return { name: 'zf' };
}
// 返回值少参数,不行
// getPerson = g2;
function g3() {
    return { name: 'zf', age: 10, gender: 0 };
}
// 多参数,可以
getPerson = g3;
export {};
//# sourceMappingURL=11.2ts%E7%9A%84%E5%85%BC%E5%AE%B9%E6%80%A7.js.map