/**
 * 纯函数
 * 副作用
 * 
 * 1.相同的参数返回相同的值
 */

 function sum(a,b){
     return a+b;
 }

 /**
  * 2.不能修改作用域外的参数
  * 如果修改了,就是产生副作用
  */

  function sum1(a,b){
      window.a = 'c';       // 这样就会产生副作用
      return a+b;
  }