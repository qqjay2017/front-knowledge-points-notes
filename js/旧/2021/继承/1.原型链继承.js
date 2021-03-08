// 实现原型链继承有一种基本模式,实现的本质是重写原型对象
// 

function SuperType(){
    this.property = true
}
SuperType.prototype.getSuperValue = function(){
    return this.property
}

function SubType(){
    this.subProperty = false
}


SubType.prototype = new SuperType()

// 3.给原型添加方法的代码一定要放在替换原型的语句之后

SubType.prototype.getSubValue = function(){
    return this.subProperty
}

var instance = new SubType()


// instance.__proto__ == SubType.prototype
// =>
// instance.__proto__ == SuperType.prototype

 console.log(instance.getSuperValue()) // 

 // 问题: 
 // 1. 引用类型的原型属性会被所有实例共享
 // 2. 不能给构造函数传参