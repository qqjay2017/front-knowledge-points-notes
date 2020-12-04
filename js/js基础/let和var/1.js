'use strict'

debugger;
var a = 1;
console.log(a);         //1

{
    console.log(a)          // fn a
    function a() {
        console.log(1)
    }
}
console.log(a)          // 1 


/**
 * var function  定义的在顶层变量
 * 
 * es6里面  vo go 进行了分离
 */