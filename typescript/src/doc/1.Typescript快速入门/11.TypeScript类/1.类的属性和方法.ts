export default class Greeter {
    // 静态属性
    static cname:string = "Greeter";
    // 成员属性
    greeting:string;
    // 构造函数
    constructor(message:string) {
        this.greeting = message
    }
    // 静态方法
    static getClassName (){
        return "Class name is Greeter"
    }
    // 成员方法
    greet(){
        return "hello, "+this.greeting;
    }
}

// 编译出来的

var Greeter1 = /** @class */ (function () {
    // 构造函数
    function Greeter(message) {
        // @ts-ignore
        this.greeting = message;
    }
    // 静态方法,静态的直接挂
    Greeter.getClassName = function () {
        return "Class name is Greeter";
    };
    // 成员方法,成员的挂原型上
    Greeter.prototype.greet = function () {
        return "hello, " + this.greeting;
    };
    // 静态属性
    Greeter.cname = "Greeter";
    return Greeter;
}());
