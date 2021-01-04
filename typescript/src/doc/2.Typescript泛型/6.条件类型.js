// 若 T 能够赋值给 U ，那么类型是 X ，否则为 Y 。
// T extends U ? X : Y
// 利用条件类型和infer关键字,方便的获取promise对象的返回值类型
async function stringPromise() {
    return "Hello, Semlinker!";
}
async function personPromise() {
    return { name: "Semlinker", age: 30 };
}
export {};
//# sourceMappingURL=6.%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B.js.map