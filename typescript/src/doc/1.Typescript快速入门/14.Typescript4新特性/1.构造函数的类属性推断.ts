// noImplicitAny 启用后,TypeScript 4.0 就可以使⽤控制流分析来确认类中的属性类型：


class Person {
    // 从构造函数推断类属性的类型,4.0前如果开启noImplicitAny,会报错
    fullName;
    firstName;
    lastName;

    constructor(fullName:string) {
        this.fullName = fullName;
        this.firstName = fullName.split(" ")[0];
        this.lastName = fullName.split(" ")[1]
    }
}