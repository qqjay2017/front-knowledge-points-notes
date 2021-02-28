// 最新的ES6规范引入了新的数据类型Map
var m = new Map([['Michael', 95], ['Bob', 75]]);
m.set('Tracy', 99);
console.log(m.get('Michael'))

let s = new Set([1,2,3]);
s.add(4)
// 数组转set
console.log(Array.from(s))