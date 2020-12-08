// 
// ReturnType<T> 的作用是用于获取函数 T 的返回类型。


/**
 * 定义
 * Obtain the return type of a function type
 */
// type ReturnType<T extends (...args: any) => any> = 
// T extends (...args: any) => infer R ? R : any;




type T0 = ReturnType<()=>string> //string
type T1 = ReturnType<(s:string)=>void> // void
// type T2 = unknown
type T2 = ReturnType<<T>()=>T>
// type T3 = number[]
type T3 = ReturnType<<T extends U,U extends number[]>()=>T>

type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T6 = ReturnType<string>; // Error
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// type T7 = ReturnType<Function>; // Error


export{}
