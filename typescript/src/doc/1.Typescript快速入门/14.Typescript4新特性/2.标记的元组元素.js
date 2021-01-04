"use strict";
function addPerson(...args) {
    console.log(`Person info: ${args[0]},age,${args[1]}`);
}
// 上面和下面的实现是一样的
function addPerson1(name, age) {
    console.log(`Person info: ${name},age,${age}`);
}
// TypeScript 4.0 ⽀持为元组类型设置标签
function addPerson3(...args) {
    console.log(`Person info: ${args[0]},age,${args[1]}`);
}
// 元组类型设置标签后可以更智能的提示
addPerson3('111', 3);
//# sourceMappingURL=2.%E6%A0%87%E8%AE%B0%E7%9A%84%E5%85%83%E7%BB%84%E5%85%83%E7%B4%A0.js.map