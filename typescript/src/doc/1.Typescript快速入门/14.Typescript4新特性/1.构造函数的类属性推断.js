"use strict";
// noImplicitAny 启用后,TypeScript 4.0 就可以使⽤控制流分析来确认类中的属性类型：
class Person {
    constructor(fullName) {
        this.fullName = fullName;
        this.firstName = fullName.split(" ")[0];
        this.lastName = fullName.split(" ")[1];
    }
}
//# sourceMappingURL=1.%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E7%9A%84%E7%B1%BB%E5%B1%9E%E6%80%A7%E6%8E%A8%E6%96%AD.js.map