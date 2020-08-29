// 3.1布尔类型
let married: boolean=false;
// 3.2数字类型
let age:number =10;
// 3.3字符串类型
let firstName:string='zf';

// 3.4数组类型
let arr2:number[]=[4,5,6];
let arr3:Array<number> = [7,8,9];

// 3.5元组类型
// 在 TypeScript 的基础类型中，
// 元组（ Tuple ）表示一个已知数量和类型的数组
// 元组用来表示一个固定的结构
let zhufeng:[string,number] = ['zf',19];

console.log(zhufeng[0].length);
console.log(zhufeng[1].toFixed(2))

// 3.6枚举类型

// 事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
// 比如性别、月份、星期、颜色、单位、学历

// 3.6.1普通枚举

enum Gender {
    GIRL,
    BOY
}

enum Week{
    MONDAY=1,
    TUESDAY=2
}

// 3.6.2常数枚举
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
// 假如包含了计算成员，则会在编译阶段报错

const enum Colors {
    Red,    // 0
    Yellow, // 1
    Blue ='Blue'   //2
}

console.log(`李雷是${Gender.BOY}`);
console.log(`韩梅梅是${Gender.GIRL}`);

console.log(Colors.Blue)

// 3.7 任意类型

// any就是可以赋值给任意类型
// 第三方库没有提供类型文件时可以使用any
// 类型转换遇到困难时
// 数据结构太复杂难以定义

// 3.8 null和undefined

// null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined
// strictNullChecks 参数用于新的严格空检查模式,在严格空检查模式下， null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any

let x: number;
x = 1;
x = undefined;    
x = null;   

let y: number | null | undefined;
y = 1;
y = undefined;   
y = null;   

// 3.9void类型
// void 表示没有任何类型
// 当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。

// /3.10never类型

// never是其它类型(null undefined)的子类型，代表不会出现的值

// 3.11 Symbol
// 我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库
//  "lib": ["DOM","ES2015","ES2015.Symbol","ES2015.Symbol.WellKnown","ES2016"],   
// Symbol 是在ES2015之后成为新的原始类型,它通过 Symbol 构造函数创建
// Symbol 的值是唯一不变的

const sym1 = Symbol('key');
const sym2 = Symbol('key');
console.log(Symbol('key') === Symbol('key') )// false


// 3.15 联合类型
// 联合类型（Union Types）表示取值可以为多种类型中的一种
// 未赋值时联合类型上只能访问两个类型共有的属性和方法

let name1: string | number;
console.log(name1.toString());
name1 = 3;
console.log(name1.toFixed(2));
name1 = 'zhufeng';
console.log(name1.length);

// 字面量类型和类型字面量
// 字面量类型的要和实际的值的字面量一一对应,如果不一致就会报错
// 类型字面量和对象字面量的语法很相似
const up:'Up'= 'Up';
const down: "Down" = "Down";
const left: "Left" = "Left";
const right: "Right" = "Right";
type Direction = 'Up' | 'Down' | 'Left' | 'Right';
function move(direction: Direction) {

    console.log(direction)
}
move("Up");
