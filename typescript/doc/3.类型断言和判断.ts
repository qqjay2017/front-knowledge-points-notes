// ts中比较复杂的类型

// 1.联合类型,可以看成并集,但是还没初始化的时候,只能调用两者类型中的共有方法

let a: number | string;

a = 'abcd';
console.log(a.slice(1))

// 会根据赋值来推导后续的方法
a = 1;
a.toPrecision()



// 2.断言

let ele: HTMLElement | null = document.getElementById('#app')

// 非空断言,一定有值,!是es语法
ele!.style.color = 'red'

// 非空判断,?是es11语法
// ele?.style  ele && ele.style
console.log(ele?.style);

// 断言操作,也可以.了

(ele as HTMLElement).style.color = 'red';

//3. 字面量类型

// let direction : 'up'|'down'|'left'|'right';

// 用type关键字,和上面效果一样的
type Direction =  'up'|'down'|'left'|'right'
let direction:Direction;
direction='up';


export { }       //这样防止模块间的干扰