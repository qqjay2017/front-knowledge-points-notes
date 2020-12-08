(function () {
    'use strict';

    class Greeter {
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

    const greeter = new Greeter('me');
    console.log(greeter.greeting);

}());
//# sourceMappingURL=bundle.js.map
