class Greeter {
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
