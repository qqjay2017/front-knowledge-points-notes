function Parent(name){
    this.name = name;
    this.colors = ['red','blue']
}
Parent.prototype.getName = function(){
    console.log(this.name)
}

function Child(name,age){
    Parent.call(this,name)
    this.age = age;
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('c1',18)
child1.colors.push('black')

console.log(child1)