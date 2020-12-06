
// 1.接口的兼容性
// 原理是  duck-check


interface Animal {
    name: string,
    age: number
}

interface Person {
    name: string,
    age: number,
    gender: number
}


function getName(animal: Animal): string {
    return animal.name
}


let p: Person = {
    name: 'zf',
    age: 10,
    gender: 0
}
// 这样是可以的,传参的时候每会进行兼容性比较,因为Animal的属性在Person里面都有
getName(p);

// 报错:赋值的时候不会比较,会直接报错
// let a:Animal {
//     gender:0
// }


// 2.基本数据类型的兼容性

let numStr: string | number;
let str: string = 'zf';
// 可以,因为numStr可以容纳string和number
numStr = str;


let num2: {
    toString(): string
}
let str2: string = 'jg';
// 可以,因为str2有toString方法
num2 = str2;


// 3.类的兼容性

namespace a {
    class Animal { name: string; }
    class Bird extends Animal { age: number }
    let a: Animal;
    let b: Bird = new Bird();
    // a可以等于b,因为b继承a,有a所有属性
    a = b;
    // b不能等于a,因为Animal没有age属性
    // b=a;
}


// 4.函数的兼容性 !!!!!
// 1.比较参数2.比较返回值

type Func = (a: number, b: number) => void;

let sum:Func;

function f1(a:number,b:number):void{

}
// 完全一样,可以
sum = f1;

function f2(a:number):void{

}
// 参数少一个:可以
sum = f2;

function f3(a:number,b:number,c:number):void{

}
// 多参数,不行
// sum = f3;


// 比较返回值

type GetPerson = ()=>{name:string,age:number}
let getPerson :GetPerson;

function g1(){
    return {name:'zf',age:10}
}
// 可以,完全一样
getPerson = g1;
function g2(){
    return {name:'zf'}
}
// 返回值少参数,不行
// getPerson = g2;

function g3(){
    return {name:'zf',age:10,gender:0}
}
// 多参数,可以
getPerson = g3;




export { }