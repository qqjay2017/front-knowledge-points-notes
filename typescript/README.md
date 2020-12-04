# typescript 

## 安装

`npm i typescript ts-node -g`

## 初始化配置

`tsc --init`

## 什么时候标识类型  什么时候不用标识


ts自带类型推断功能

默认在初始化时进行类型推导,如果可以推导出正确的类型,就不用给类型

## number和大Number的区别

在使用基本数据类型时,会将原始类型包装成对象类型(掉方法时)

```ts
let number1:number = 11 // 可以
let number11:Number = 11    // 可以:类也是一个类型,他可以表述实例
let number2:number = Number(11)  // 可以,Number()返回的类型是number
let number3:number = new Number(11) // 不可以,对象类型不能给基本类型,要像number4一样
let number4:Number = new Number(11)  // 可以
```