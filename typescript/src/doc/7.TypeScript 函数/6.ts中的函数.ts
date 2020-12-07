// ts中的函数


// 考虑入参和函数的返回值
// 声明不赋值就是any   "noImplicitAny": false, 允许隐含的any

// 都不给类型
function sum1(a,b){  
    return a+b;
}

// 完整类型  如果使用的是表达式,可以把一个兼容的函数赋给他
type sumType =  (a: string, b: string) => string;  // 给函数声明类型,一般用type,箭头是返回值类型
let sum2:sumType =  (a:string,b:string):string=>{  
    return a+b;
}



// 可选参数

let sum3 = (a:number,b?:number)=>{
    console.log(a,b)
}



export { }       //这样防止模块间的干扰