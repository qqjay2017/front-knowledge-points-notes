// ts中的泛型
// 函数 接口 类型别名  
function createArray(times, val) {
    let result = [];
    for (let index = 0; index < times; index++) {
        result.push(val);
    }
    return result;
}
let r1 = createArray(3, 'abc'); // <String> 不写,也会根据abc类型自动推导出泛型
console.log(r1[0].toLocaleLowerCase());
const swap1 = (tuple) => {
    return [tuple[1], tuple[0]];
};
// 求和函数,希望求和
// const sum1 = <T>(a:T,b:T):T=>{
//     return a+b;
// }
// 使用extends关键字,是T具有number的能力
const sum1 = (a, b) => {
    return (a + b);
};
// 泛型约束
// 希望T有length属性
const getType = (obj) => {
    console.log(obj.length);
};
// 传入的参数必须有length属性
getType([1, 23]);
// 约束属性  T是一个对象,K是T里面的key
const getVal = (obj, key) => {
    console.log(obj, key);
};
getVal({ a: 1, b: 2 }, 'a');
export {};
//# sourceMappingURL=10.2%E6%B3%9B%E5%9E%8B%E7%BA%A6%E6%9D%9F.js.map