export default class Greeter {
    // 构造函数
    constructor(message) {
        this.greeting = message;
    }
    // 静态方法
    static getClassName() {
        return "Class name is Greeter";
    }
    // 成员方法
    greet() {
        return "hello, " + this.greeting;
    }
}
// 静态属性
Greeter.cname = "Greeter";
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
//# sourceMappingURL=1.%E7%B1%BB%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95.js.map