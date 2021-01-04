// 1.typeof
const sem = { name: 'semlinker', age: 33 };
function toArray(x) {
    return [x];
}
let p1 = 'name';
let p2 = 'length';
let obj = {
    a: 'a', b: 'b', c: 'c'
};
// T被约束了Lengthwise接口,必须包含length属性
function loggingIdentity(arg) {
    console.log(arg);
    return arg;
}
function updateTodo(todo, fieldToUpdate) {
    return { ...todo, ...fieldToUpdate };
}
export {};
//# sourceMappingURL=4.%E6%B3%9B%E5%9E%8B%E5%B7%A5%E5%85%B7%E7%B1%BB%E5%9E%8B.js.map