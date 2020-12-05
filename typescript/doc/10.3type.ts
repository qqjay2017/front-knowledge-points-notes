// 类型别名

type Card<T> = {list:T[]} |T[]

let c1:Card<string> = {list:['1']}
let c2:Card<number> = [1,2,3]

// interface 和type的区别

// 能用接口实现的,不要用type

export {}