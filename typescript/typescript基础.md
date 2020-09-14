# typescript

> http://www.zhufengpeixun.com/2020/html/65.1.typescript.html#t273.13%20%E7%B1%BB%E5%9E%8B%E6%8E%A8%E8%AE%BA

## 安装

`npm i typescript -g`

`tsc helloworld.ts`

## Vscode+TypeScript

#### 生成配置文件

`tsc --init`

#### vscode运行

- Terminal->Run Task-> tsc:build 编译
- Terminal->Run Task-> tsc:watch 编译并监听

## 数据类型

#### 3.1布尔类型
`let married: boolean=false;`
####  3.2数字类型
`let age:number =10;`
####  3.3字符串类型
`let firstName:string='zf';`

####  3.4数组类型
```
let arr2:number[]=[4,5,6];
let arr3:Array<number> = [7,8,9];
```
####  3.5元组类型
 在 TypeScript 的基础类型中，
 元组（ Tuple ）表示一个已知数量和类型的数组
 元组用来表示一个固定的结构
```ts
let zhufeng:[string,number] = ['zf',19];

console.log(zhufeng[0].length);
console.log(zhufeng[1].toFixed(2))
```

####  3.6枚举类型

 事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
 比如性别、月份、星期、颜色、单位、学历

######  3.6.1普通枚举

```ts
enum Gender {
    GIRL,
    BOY
}

enum Week{
    MONDAY=1,
    TUESDAY=2
}
```
######  3.6.2常数枚举
 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
 假如包含了计算成员，则会在编译阶段报错

```ts
const enum Colors {
    Red,    // 0
    Yellow, // 1
    Blue ='Blue'   //2
}

console.log(`李雷是${Gender.BOY}`);
console.log(`韩梅梅是${Gender.GIRL}`);

console.log(Colors.Blue)
```
####  3.7 任意类型

// any就是可以赋值给任意类型
// 第三方库没有提供类型文件时可以使用any
// 类型转换遇到困难时
// 数据结构太复杂难以定义

#### 3.8 null和undefined

 null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined
 strictNullChecks 参数用于新的严格空检查模式,在严格空检查模式下， null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any
```ts
let x: number;
x = 1;
x = undefined;    
x = null;   

let y: number | null | undefined;
y = 1;
y = undefined;   
y = null;   
```
#### 3.9void类型
// void 表示没有任何类型
// 当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。

#### 3.10never类型

 never是其它类型(null undefined)的子类型，代表不会出现的值

#### 3.11 Symbol
 我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库
  "lib": ["DOM","ES2015","ES2015.Symbol","ES2015.Symbol.WellKnown","ES2016"],   
 Symbol 是在ES2015之后成为新的原始类型,它通过 Symbol 构造函数创建
 Symbol 的值是唯一不变的
```ts
const sym1 = Symbol('key');
const sym2 = Symbol('key');
console.log(Symbol('key') === Symbol('key') )// false
```
#### 3.15 联合类型

 联合类型（Union Types）表示取值可以为多种类型中的一种


 未赋值时联合类型上只能访问两个类型共有的属性和方法
```ts
let name1: string | number;
console.log(name1.toString());
name1 = 3;
console.log(name1.toFixed(2));
name1 = 'zhufeng';
console.log(name1.length);
```
 字面量类型和类型字面量
 字面量类型的要和实际的值的字面量一一对应,如果不一致就会报错
 类型字面量和对象字面量的语法很相似

```ts
const up:'Up'= 'Up';
const down: "Down" = "Down";
const left: "Left" = "Left";
const right: "Right" = "Right";
type Direction = 'Up' | 'Down' | 'Left' | 'Right';
function move(direction: Direction) {

    console.log(direction)
}
move("Up");
```



 - 字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种
 - 字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致

## 函数

#### 定义函数类型

```ts
type GetUsernameFunction  = (x:string,y:string)=>string

let getUserName:GetUsernameFunction=(firstName,lastName)=>{
    return firstName+lastName;
}
```


#### 函数重载

在TypeScript中，表现为给同一个函数提供多个函数类型定义

```ts
let obj:any={}

function attr(val:string):void;
function attr(val:number):void;
function attr(val:any):void{
    if(typeof val ==='string'){
        obj.name = val;
    }else {
        obj.age =val;
    }
};

attr('zf')
attr(9);
console.log(obj)
```

## 类

#### 静态属性和实例属性

```ts
class Component {
    static myName: string = '静态名称属性';
    myName: string = '实例名称属性';
}

let c:Component = new Component();

console.log(Component.myName)
console.log(c.myName)
```

静态属性是挂载在函数的原型链上面

```js
function Component() {
        this.myName = '实例名称属性';
    }
Component.myName = '静态名称属性';
```

#### 存取器

```ts
class User {
    myname:string;
    constructor(myname: string) {
        this.myname = myname;
    }
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('zhufeng');
user.name = 'jiagou'; 
console.log(user.name); 
```

```js
Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myname;
        },
        set: function (value) {
            this.myname = value;
        },
        enumerable: false,
        configurable: true
    });
```

#### readonly

 - readonly修饰的变量只能在`构造函数`中初始化
 - 在 TypeScript 中，`const` 是常量标志符，其值不能被重新分配
 - TypeScript 的类型系统同样也允许将 `interface`、`type`、 `class` 上的属性标识为 readonly
 - readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查（在支持 const 语法的 JavaScript 运行时环境中）


```ts
class Animal {
    public readonly name: string
    constructor(name:string) {
        this.name = name;
    }
    changeName(name:string){
        // Cannot assign to 'name' because it is a read-only property.
        // this.name = name;
    }
}

let a = new Animal('zhufeng');
a.changeName('jiagou');
```


#### 继承

```ts

class Person {
    name: string;//定义实例的属性，默认省略public修饰符
    age: number;
    constructor(name:string,age:number) {//构造函数
        this.name=name;
        this.age=age;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Student extends Person{
    no: number;
    constructor(name:string,age:number,no:number) {
        super(name,age);
        this.no=no;
    }
    getNo():number {
        return this.no;
    }
}
let s1=new Student('zfpx',10,1);
console.log(s1);
```


#### 类里面的修饰符

```ts
public name: string;  //类里面 子类 其它任何地方外边都可以访问
protected age: number; //类里面 子类 都可以访问,其它任何地方不能访问
private money: number; //类里面可以访问， 子类和其它任何地方都不可以访问
```


## 装饰器 Decorators

#### 类装饰器

```ts
namespace a {
    //当装饰器作为修饰类的时候，会把构造器传递进去
    function addNameEat(constructor: Function) {
      constructor.prototype.name = "zhufeng";
      constructor.prototype.eat = function () {
        console.log("eat");
      };
    }
    @addNameEat
    class Person {
      name!: string;
      eat!: Function;
      constructor() {}
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}


namespace b {
    //还可以使用装饰器工厂
    function addNameEatFactory(name:string) {
    return function (constructor: Function) {
        constructor.prototype.name = name;
        constructor.prototype.eat = function () {
        console.log("eat");
        };
    };
    }
    @addNameEatFactory('zhufeng')
    class Person {
      name!: string;
      eat!: Function;
      constructor() {}}
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}

namespace c {
    //还可以替换类,不过替换的类要与原类结构相同
    function enhancer(constructor: Function) {
    return class {
        name: string = "jiagou";
        eat() {
        console.log("吃饭饭");
        }
    };
    }
    @enhancer
    class Person {
      name!: string;
      eat!: Function;
      constructor() {}}
    let p: Person = new Person();
    console.log(p.name);
    p.eat();

}
```


#### 属性修饰器和方法修饰器


- 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
        - 属性装饰器用来装饰属性
        - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
        - 第二个参数是属性的名称
- 方法装饰器用来装饰方法
        - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
        - 第二个参数是方法的名称
        - 第三个参数是方法描述符




```ts
namespace d {
  //修饰实例属性
  function upperCase(target: any, propertyKey: string) {
      let value = target[propertyKey];
      const getter = function () {
          return value;
      }
      // 用来替换的setter
      const setter = function (newVal: string) {
          value = newVal.toUpperCase()
      };
      // 替换属性，先删除原先的属性，再重新定义属性
      if (delete target[propertyKey]) {
          Object.defineProperty(target, propertyKey, {
              get: getter,
              set: setter,
              enumerable: true,
              configurable: true
          });
      }
  }
  //修饰实例方法
  function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
      console.log('target.getName', target.getName);
      console.log('target.getAge', target.getAge);
      descriptor.enumerable = true;
  }
  //重写方法
  function toNumber(target: any, methodName: string, descriptor: PropertyDescriptor) {
      let oldMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
          args = args.map(item => parseFloat(item));
          return oldMethod.apply(this, args);
      }
  }
  class Person {
      @upperCase
      name: string = 'zhufeng'
      public static age: number = 10
      constructor() { }
      @noEnumerable
      getName() {
          console.log(this.name);
      }
      @toNumber
      sum(...args: any[]) {
          return args.reduce((accu: number, item: number) => accu + item, 0);
      }
  }
  let p: Person = new Person();
  for (let attr in p) {
      console.log('attr=', attr);
  }
  p.name = 'jiagou';
  p.getName();
  console.log(p.sum("1", "2", "3"));
}
```




#### 参数装饰器

会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
    第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
    第2个参数的名称
    第3个参数在函数列表中的索引

```ts
// 方法装饰器

namespace d {
    interface Person {
        age: number;
    }
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target);        // Person { login: [Function] }类原型对象
        console.log(methodName);    // 方法名称
        console.log(paramsIndex);   // 函数列表中的索引,0开始算
        target.age = 10;
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password);
        }
    }
    let p = new Person();
    p.login('zhufeng', '123456')
}
```


#### 装饰器执行顺序

 - 有多个参数装饰器时：从最后一个参数依次向前执行
 - 方法和方法参数中参数装饰器先执行。
 - 类装饰器总是最后执行
 - 方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
 - 类比React组件的componentDidMount 先上后下、先内后外

#### 抽象类

 - 抽象描述一种抽象的概念，无法被实例化，只能被继承
 - 无法创建抽象类的实例
 - 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现


## 接口

对象的形状

```ts
//接口可以用来描述`对象的形状`,少属性或者多属性都会报错
interface Speakable{
    speak():void;
    name?:string;//？表示可选属性
}

let speakman:Speakable = {
    speak(){},//少属性会报错
    name,
    age//多属性也会报错
}
```


行为的抽象

```ts

//接口可以在面向对象编程中表示为行为的抽象
interface Speakable{
    speak():void;
}
interface Eatable{
    eat():void
}
//一个类可以实现多个接口
class Person implements Speakable,Eatable{
    speak(){
        console.log('Person说话');
    }
    eat(){}
}
class TangDuck implements Speakable{
    speak(){
        console.log('TangDuck说话');
    }
    eat(){}
}

```

任意属性

```ts
//无法预先知道有哪些新的属性的时候,可以使用 `[propName:string]:any`,propName名字是任意的
interface Person {
  readonly id: number;
  name: string;
  [propName: string]: any;
}

let p1 = {
  id:1,
  name:'zhufeng',
  age:10
}
```

接口的继承

```ts
interface Speakable {
    speak(): void
}
interface SpeakChinese extends Speakable {
    speakChinese(): void
}
class Person implements SpeakChinese {
    speak() {
        console.log('Person')
    }
    speakChinese() {
        console.log('speakChinese')
    }
}
```

####  readonly


用 readonly 定义只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写


```ts
interface Person{
  readonly id:number;
  name:string
}
let tom:Person = {
  id :1,
  name:'zhufeng'
}
tom.id = 1;

```

#### 函数类型接口

对方法传入的参数和返回值进行约束

```ts
interface discount{
  (price:number):number
}
let cost:discount = function(price:number):number{
   return price * .8;
}
```


#### 可索引接口

 - 对数组和对象进行约束
 - userInterface 表示index的类型是 number，那么值的类型必须是 string
 - UserInterface2 表示：index 的类型是 string，那么值的类型必须是 string

```ts
interface UserInterface {
  [index:number]:string
}
let arr:UserInterface = ['zfpx1','zfpx2'];
console.log(arr);

interface UserInterface2 {
  [index:string]:string
}
let obj:UserInterface2 = {name:'zhufeng'};
```


#### 类接口


对类的约束


```ts
interface Speakable {
    name: string;
    speak(words: string): void
}
class Dog implements Speakable {
    name!: string;
    speak(words:string) {
        console.log(words);
    }
}
let dog = new Dog();
dog.speak('汪汪汪');
```

#### 构造函数的类型

 - 在 TypeScript 中，我们可以用 interface 来描述类
 - 同时也可以使用interface里特殊的new()关键字来描述类的构造函数类型

```ts
class Animal{
    constructor(public name:string){
    }
  }
  //不加new是修饰函数的,加new是修饰类的
  interface WithNameClass{
    new(name:string):Animal
  }
  function createAnimal(clazz:WithNameClass,name:string){
     return new clazz(name);
  }
  let a = createAnimal(Animal,'zhufeng');
  console.log(a.name);


  export{
      
  }
  ```

  #### 抽象类 vs 接口

  - 不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
  - 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
  - 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
  - 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
  - 抽象类也可以实现接口


## 泛型

- 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
- 泛型T作用域只限于函数内部使用

#### 泛型函数

```ts
function createArray(length: number, value: any): Array<any> {
  let result: any = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result = createArray(3,'x');
console.log(result);
```

引入泛型

```ts
function createArray<T>(length: number, value: any): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let result = createArray<string>(3, 'x');
console.log(result);
```

#### 泛型类

```ts
class MyArray<T>{
    private list:T[]=[];
    add(value:T) {
        this.list.push(value);
    }
    getMax():T {
        let result=this.list[0];
        for (let i=0;i<this.list.length;i++){
            if (this.list[i]>result) {
                result=this.list[i];
            }
        }
        return result;
    }
}
let arr=new MyArray<number>();
arr.add(1); arr.add(2); arr.add(3);
let ret = arr.getMax();
console.log(ret);
```


#### 泛型与 new

```ts
interface Calculate{
    <T>(a:T,b:T):T
  }
  let add:Calculate = function<T>(a:T,b:T){
    return a;
  }
console.log(  add<number>(1,2))
```

#### 泛型约束

在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。

```ts
function logger<T>(val: T) {
    console.log(val.length); //直接访问会报错
}
//可以让泛型继承一个接口
interface LengthWise {
    length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
    console.log(val.length)
}
logger2('zhufeng');
logger2(1);
```

#### 泛型接口

定义接口的时候也可以指定泛型

```ts
interface Cart<T>{
  list:T[]
}
let cart:Cart<{name:string,price:number}> = {
  list:[{name:'zhufeng',price:10}]
}
console.log(cart.list[0].name,cart.list[0].price);
```














