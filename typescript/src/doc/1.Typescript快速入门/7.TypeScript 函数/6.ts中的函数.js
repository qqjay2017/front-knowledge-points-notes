// ts中的函数
// 考虑入参和函数的返回值
// 声明不赋值就是any   "noImplicitAny": false, 允许隐含的any
// 都不给类型
function sum1(a, b) {
    return a + b;
}
let sum2 = (a, b) => {
    return a + b;
};
// 可选参数
let sum3 = (a, b) => {
    console.log(a, b);
};
export {};
//# sourceMappingURL=6.ts%E4%B8%AD%E7%9A%84%E5%87%BD%E6%95%B0.js.map