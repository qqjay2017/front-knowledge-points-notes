// 3.1布尔类型
var married = false;
// 3.2数字类型
var age = 10;
// 3.3字符串类型
var firstName = 'zf';
// 3.4数组类型
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];
// 3.5元组类型
// 在 TypeScript 的基础类型中，
// 元组（ Tuple ）表示一个已知数量和类型的数组
// 元组用来表示一个固定的结构
var zhufeng = ['zf', 19];
console.log(zhufeng[0].length);
console.log(zhufeng[1].toFixed(2));
// 3.6枚举类型
// 事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
// 比如性别、月份、星期、颜色、单位、学历
// 3.6.1普通枚举
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
var Week;
(function (Week) {
    Week[Week["MONDAY"] = 1] = "MONDAY";
    Week[Week["TUESDAY"] = 2] = "TUESDAY";
})(Week || (Week = {}));
console.log("\u674E\u96F7\u662F" + Gender.BOY);
console.log("\u97E9\u6885\u6885\u662F" + Gender.GIRL);
console.log("Blue" /* Blue */);
// 3.7 任意类型
// any就是可以赋值给任意类型
// 第三方库没有提供类型文件时可以使用any
// 类型转换遇到困难时
// 数据结构太复杂难以定义
// 3.8 null和undefined
// null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined
// strictNullChecks 参数用于新的严格空检查模式,在严格空检查模式下， null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any
var x;
x = 1;
x = undefined;
x = null;
var y;
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
var sym1 = Symbol('key');
var sym2 = Symbol('key');
console.log(Symbol('key') === Symbol('key')); // false
// 3.15 联合类型
// 联合类型（Union Types）表示取值可以为多种类型中的一种
// 未赋值时联合类型上只能访问两个类型共有的属性和方法
var name1;
console.log(name1.toString());
name1 = 3;
console.log(name1.toFixed(2));
name1 = 'zhufeng';
console.log(name1.length);
// 字面量类型和类型字面量
// 字面量类型的要和实际的值的字面量一一对应,如果不一致就会报错
// 类型字面量和对象字面量的语法很相似
var up = 'Up';
var down = "Down";
var left = "Left";
var right = "Right";
function move(direction) {
    console.log(direction);
}
move("Up");
