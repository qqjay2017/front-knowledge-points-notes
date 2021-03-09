// this对象是基础函数运行时基于函数的执行环境绑定的
// 全局函数: this是window
// 当函数作为某个对象的方法调用时,this等于那个对象
// 匿名函数的执行环境具有全局性,所以匿名函数的this通常指向window


var name = "The Window"

var object1 = {
    name: 'My Object',
    getNameFunc: function () {
        return this.name
    }
}

console.log(object1.getNameFunc(), 'object1') // My Object

var object2 = {
    name: 'My Object',
    getNameFunc: function () {
        return function(){
            return this.name
        }
    }
}
console.log(object2.getNameFunc()(), 'object2')// 浏览器环境是The Window,Nodejs环境是undefined