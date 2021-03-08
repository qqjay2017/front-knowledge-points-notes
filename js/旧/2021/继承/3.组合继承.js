// 实例属性放在构造函数
// 方法放在原型链上


function SuperType(name){
    this.name = name
    this.colors =['red','blue']
}
SuperType.prototype.sayName = function(){
    console.log(this.name)
}

function SubType(name,age){
    SuperType.call(this,name)
    this.age = age;
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function(){
    console.log(this.age)
}

var instance1 = new SubType('Nic',29)
instance1.colors.push('black')
console.log(instance1.colors)
instance1.sayAge()
instance1.sayName()