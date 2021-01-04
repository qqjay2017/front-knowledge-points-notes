// / 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal) {
    return animal.name;
}
let p = {
    name: 'zf',
    age: 10,
    gender: 0
};
getName(p);
let a = {
    name: '111',
    age: 10
    //只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
    // gender:0
};
export {};
//# sourceMappingURL=1.%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%85%BC%E5%AE%B9%E6%80%A7.js.map