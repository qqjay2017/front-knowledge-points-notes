

class Parent {
    static staticParentName = "staticParentName";
    static getCtaticParentName = function () {
        console.log(Parent.staticParentName)
    }

    constructor(public name) {
        // 在示例上
        this.name = name;
    }
    // 在原型上
    getName(){
        console.log(this.name)
    }
}


class Child extends Parent{
    static staticChildName = "staticChildName";
    static getCtaticChildName = function () {
        console.log(Child.staticChildName)
    }

    constructor(public name,public age) {
        super(name);
        this.age = age;
    }
    getAge(){
        console.log(this.age)
    }
}


let child = new Child('zhufeng',10);
child.getName();
child.getAge();
Child.getCtaticChildName();
Child.getCtaticParentName();


export {child}