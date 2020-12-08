// ts中的泛型

// 函数 接口 类型别名  

function createArray<T>(times:number,val:T){
    let result:T[] = [];
    for (let index = 0; index < times; index++) {
        result.push(val)
        
    }
    return result;
}

let r1 = createArray<String>(3,'abc')  // <String> 不写,也会根据abc类型自动推导出泛型

console.log(r1[0].toLocaleLowerCase())


// 泛型可以使用多个
// 元组 [string,number] => [number,string]

// function swap<T,K>(tuple:[T,K]):[K,T]{
//     return [tuple[1],tuple[0]]
// }


// console.log(swap(['aaa',111]))




// 函数表达式的写法

interface MySwap{
    <T,K>(tuple:[T,K]):[K,T]   // 调用的时候不知道类型
}
interface MySwap2<T,K>{
    (tuple:[T,K]):[K,T]   // 调用的时候 知道类型
}

// 可索引接口
interface IArr<A,B> {
    [key:number]:B;
}


const swap1:MySwap =  <T,K>(tuple:[T,K]):[K,T]=>{
    return [tuple[1],tuple[0]]
}

// 求和函数,希望求和
// const sum1 = <T>(a:T,b:T):T=>{
//     return a+b;
// }


// 使用extends关键字,是T具有number的能力
const sum1 = <T extends number>(a:T,b:T):T=>{
    return ( a+b) as T;
}

// 泛型约束
// 希望T有length属性
const getType = <T extends {length:number}>(obj:T)=>{
    console.log(obj.length)
}
// 传入的参数必须有length属性
getType([1,23])

// 默认泛型,不传递 默认给类型

interface DStr<T=string> {
    name:T
}

// 约束属性  T是一个对象,K是T里面的key
const getVal = <T extends Object,K extends keyof T>(obj:T,key:K)=>{
        console.log(obj,key)
}

getVal({a:1,b:2},'a');

// 就想加

// interface Calculate{
//     <T extends number>(a:T,b:T):void
// }

// const sum2:Calculate = <K extends number>(a:K,b:K):void=>{}
  


export { }