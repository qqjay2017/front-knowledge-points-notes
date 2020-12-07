// 通过 & 运算符可以将现有的多种类型叠加到
// ⼀起成为⼀种类型

// 合并多个类型的过程中,刚好出现某些类型存在相同的字段
// 那么这个类型会变成never

interface X{
    c:string;
    d:string;
}

interface Y {
    c:number;
    e:string;
}

type XY = X & Y;
type YX = Y & X;

// 合并后,相同的字段c类型变成never,因为既是string也是number类型,
// 很明显这种类型是不存在的,所以是never
// let p :XY ={
//     c: undefined,
//     // c:()=>new Error(),
//     d:'d',
//     e:'e'
// }