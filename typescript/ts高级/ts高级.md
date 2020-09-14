## 结构类型系统

#### 接口的兼容性

```ts
interface Animal {
    name:string,
    age:number
}

interface Person {
    name:string,
    age:number,
    gender:number
}
// / 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal:Animal):string{
    return animal.name;
}

let p = {
    name:'zf',
    age:10,
    gender:0
}

getName(p);

let a:Animal ={
    name:'111',
    age:10,
    //只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
    // gender:0
}
```


#### 基本类型的兼容性

```ts
//基本数据类型也有兼容性判断
let num : string|number;
let str:string='zhufeng';
num = str;

//只要有toString()方法就可以赋给字符串变量
let num2 : {
  toString():string
}

let str2:string='jiagou';
num2 = str2;

```

#### 类的兼容性


在TS中是结构类型系统，只会对比结构而不在意类型


#### 函数的兼容性

比较函数的时候是要先比较函数的参数，再比较函数的返回值

#### 函数的协变与逆变

```ts
class Animal {

}

class Dog extends Animal {
    public name: string = 'Dog';
}
class BlackDog extends Dog {
    public age: number = 10;

}

class WhiteDog extends Dog {
    public home: string = '北京';
}


let animal: Animal;
let blackDog: BlackDog;
let whiteDog: WhiteDog;
type Callback = (dog: Dog) => Dog;

function exec(callback: Callback): void {
    callback(whiteDog);
}


type ChildToChild = (blackDog: BlackDog) => BlackDog;
const childToChild: ChildToChild = (blackDog: BlackDog): BlackDog => blackDog;
exec(childToChild);

//不行,理由同上 Callback接收的Dog有name属性, Animal没有name属性
// type ChildToParent = (blackDog: BlackDog) => Animal;
// const childToParent: ChildToParent = (blackDog: BlackDog): Animal => animal
// exec(childToParent);

//不行 因为有可能调用返回的Dog的方法
// type ParentToParent = (animal: Animal) => Animal;
// const parentToParent: ParentToParent = (animal: Animal): Animal => animal
// exec(parentToParent);

//可以,所有的狗都是动物,返回的不管什么狗都是狗
type ParentToChild = (animal: Animal) => BlackDog;
const parentToChild: ParentToChild = (animal: Animal): BlackDog => blackDog
exec(parentToChild);



// string | number|boolean 是 string | number的父类型
// string是string|number的子类型

type Callback2 = (a: string | number) => string | number;

function exec2(callback: Callback2): void {
    callback('');
}

type ParentToChild2 = (a: string | number | boolean) => string;
const parentToChild2: ParentToChild2 = (a: string | number | boolean): string => ''
exec2(parentToChild2)


export {

}
```
 在 TypeScript 中， 参数类型是双向协变的 ，也就是说既是协变又是逆变的，而这并不安全。
 但是现在你可以在 TypeScript 2.6 版本中通过 --strictFunctionTypes 或 --strict 标记来修复这个问题



## 类型保护

 - 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
 - 类型保护就是能够通过关键字判断出分支中的类型


 #### typeof类型保护

 #### instanceof类型保护

 #### null保护

 开启了`strictNullChecks`选项，那么对于可能为null的变量不能调用它上面的方法和属性


 #### 判断运算符

 ```ts
 a?.b; //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
 ```

 #### 可辨识的联合类型

 类型字面量+可辨识联合类型

 ```ts
 interface User {
    username: string
}
type Action = {
    type:'add',
    payload:User
} | {
    type: 'delete'
    payload: number
}
const UserReducer = (action: Action) => {
  switch (action.type) {
    case "add":
      let user: User = action.payload;
      break;
    case "delete":
      let id: number = action.payload;
      break;
    default:
      break;
  }
};
```

#### in运算符

```ts
interface Bird {
    swing: number;
}

interface Dog {
    leg: number;
}

function getNumber(x: Bird | Dog) {
    if ("swing" in x) {
      return x.swing;
    }
    return x.leg;
}
```

#### 自定义的类型保护

```ts
  swing: number;
}

interface Dog {
  leg: number;
}

//没有相同字段可以定义一个类型保护函数
function isBird(x:Bird|Dog): x is Bird{
  return (<Bird>x).swing == 2;
  //return (x as Bird).swing == 2;
}

function getAnimal(x: Bird | Dog) {
  if (isBird(x)) {
    return x.swing;
  }
  return x.leg;
}
```

## 声明类型


 - 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
 - 类型声明在编译的时候都会被删除，不会影响真正的代码
 - 关键字 declare 表示声明的意思,我们可以用它来做出各种声明:

```
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明(含有子属性的)全局对象
interface 和 type 声明全局类型
```

#### 普通类型声明

```ts
declare let name: string;  //变量
declare let age: number;  //变量
declare function getName(): string;  //方法
declare class Animal { name: string }  //类
console.log(name, age);
getName();
new Animal();
export default {};
```

#### 外部枚举

```
declare enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```


#### 第三方声明文件

 - 可以安装使用第三方的声明文件
 - @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
 - JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
 - 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
 - 这些内置对象的类型声明文件，就包含在TypeScript 核心库的类型声明文件中


#### 使用jquery

```
 npm i jquery -S
```

```
//对于common.js风格的模块必须使用 import * as 
import * as jQuery from 'jquery';
jQuery.ajax('/user/1');
```

```
npm i @types/jquery -S
```