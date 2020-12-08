// Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。

// 定义

// type Exclude<T, U> = T extends U ? never : T;


// 实例

// type T0 = "b" | "c"
type T0 = Exclude<'a'|'b'|'c','a'>
// type T1 = "c"
type T1 = Exclude<'a'|'b'|'c','a'|'b'>

// // string | number
type T2 = Exclude<string | number | (() => void), Function>; 
export{}