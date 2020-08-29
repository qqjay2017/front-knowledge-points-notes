# js类型


## 基本类型


 - String
        `typeof val === 'string'`
 - Number
        `typeof val === 'number'`
 - boolean
        `typeof val === 'boolean'`
 - symbol
        `typeof val === 'symbol'`
 - undefined
        `typeof undefined === 'undefined'`
 - null
 - BigInt

 ## 引用类型

 - Object
        ` val !== null && typeof val === 'object'`
 - Array
        `Array.isArray`
 - Function
        `typeof val === 'function'`


## 区别

1.基础类型是按值访问，引用类型通过引用地址访问 
2.基础类型存储在stack内，引用类型会将地址存储在栈中，然后通过地址去heap中获取值 
3.赋值时，基础类型是各自独立，而引用类型则是通过将地址赋值给对方，所以修改时，都会发生改变 
4.参数传递的时候，都是按值传递，但是引用类型是传递的内存地址，所以改变引用对象时，都会发生改变