"use strict";
exports.__esModule = true;
// / 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal) {
    return animal.name;
}
var p = {
    name: 'zf',
    age: 10,
    gender: 0
};
getName(p);
var a = {
    name: '111',
    age: 10
    //只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
    // gender:0
};
