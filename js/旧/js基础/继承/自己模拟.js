// 继承圣杯模式

// var inherit = (function () {
//     var F = function () { };//利用闭包，实现变量私有化
//     return function (Target, Origin) {
//         F.prototype = Origin.prototype;
//         Target.prototype = new F();
//         //通过原型链连接
//         Targer.prototype.constuctor = Target;
//         Target.prototype.uber = Origin.prototype;
//     }
// }());


function __extend(Child, Parent) {
    // console.dir(Child.__proto__)
    // 静态继承
    Child.__proto__ = Parent;
    function Temp() {
        this.constructor = Child;

    }
    Temp.prototype = Parent.prototype;

    Child.prototype = new Temp();


}

var Parent = (function () {
    function Parent(name) {
        this.name = name;
    }
    Parent.prototype.getName = function () {
        console.log(this.name)
    }
    Parent.staticParentName = "staticParentName";
    Parent.getCtaticParentName = function () {
        console.log(Parent.staticParentName)
    }
    return Parent;
})();



var Child = (function (__super) {

    __extend(Child, __super)
    function Child(name, age) {
        // 调用父类的构造函数,初始化父类的私有属性
        var _this = __super.call(this, name) || this;
        _this.name = name;
        _this.age = age;
        return _this;
    }
    // console.dir(Child.prototype)
    // 这时候的  Child.prototype 已经是father了

    Child.prototype.getAge = function () {
        console.log(this.age)
    }

    Child.staticChildName = "staticChildName";
    Child.getCtaticChildName = function () {
        console.log(Child.staticChildName)
    }
    return Child;
})(Parent)

let child = new Child('zhufeng', 10);
child.getName();
child.getAge();
Child.getCtaticParentName()