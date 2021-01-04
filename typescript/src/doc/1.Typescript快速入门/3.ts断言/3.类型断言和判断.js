// ts中比较复杂的类型
// 1.联合类型,可以看成并集,但是还没初始化的时候,只能调用两者类型中的共有方法
let a;
a = 'abcd';
console.log(a.slice(1));
// 会根据赋值来推导后续的方法
a = 1;
a.toPrecision();
// 2.断言
let ele = document.getElementById('#app');
// 非空断言,一定有值,!是es语法
ele.style.color = 'red';
// 非空判断,?是es11语法
// ele?.style  ele && ele.style
console.log(ele?.style);
// 断言操作,也可以.了
ele.style.color = 'red';
let direction;
direction = 'up';
export {};
//# sourceMappingURL=3.%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80%E5%92%8C%E5%88%A4%E6%96%AD.js.map