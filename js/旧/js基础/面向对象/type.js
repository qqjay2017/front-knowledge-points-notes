/**
 * js的数据类型分为两种
 * 
 * 基本类型  string boolean number null undefined symbol 
 * 引用类型     对象 数组 Date   Math Function  是一种比较特殊的对象
 */


 console.log(typeof 'a');           // string
 console.log(typeof true);          // boolean
 console.log(typeof 1);             // number
 console.log(typeof null);          // object  null用typeof看也是object
 console.log(typeof undefined);     // undefined
 console.log(typeof Symbol('fn'));  // symbol
 // 引用类型用typeof看  都是object
 console.log(typeof {});  // object
 console.log(typeof []);  // object
 console.log(typeof /^$/);  // object
 console.log(typeof new Date());  // object
 console.log(typeof  function(){});  // function  函数是一种非常特殊的对象


 /**
  * 对象和基本数据类型的本质区别是什么
  * 
  * 基本是光棍,或者说只是一个值
  * 
  * 而对象类型是若干个属性的集合
  * 
  * 
  * 一切引用类型都是对象
  * 函数和数组也是对象
  * 
  * function为什么这么 特殊,和其他对象的本质区别是什么?
  * function本质上来说是可以生产别的对象的,他是一个对象的工厂,
  * 所有的对象包括函数本身都是函数生产出来的
  * 
  * 
  * 我们可以把对象的属性分为两种
  * 每个特有的属性,都不一样,(私有)
  * 另一种是所有的都有(公有)
  * 
  * 
  * 
  */