/** 
 * 应用上下文  ExecuteContext
 * 函数运行的时候,会在GO生成一个对象Value Object(VO)
 * Value Object   的key是变量名   value是值
 * 
 * 基本类型直接放,引用类型值存在新的堆里面,地址值作为VO的value
 * 
 */


let ExecuteContext = {
    this:window,

    VO: {
        a: 2,
        b: 3,
        c: 'XA1'
    }
};

export function test() {
    debugger;
    var a = 2;
    var b = 3;
    function c() {

    };
    c();
}
test()


/**
 * 基本类型赋值  是拷贝
 * 引用类型是地址
 */


 /**
  * 执行上下文栈
  * 
  * 栈是一个数据结构,里面放着很多执行上下文
  * 
  * 每次函数执行,都会产生一个执行上下文
  * 
  * 全局上下文被称为GO,GO可以在任何地方被访问
  * 在浏览器端,GO就是window
  */