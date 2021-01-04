/**
 *  // 私有字段
 */
export default class Person {
    constructor(name) {
        this.#name = name;
    }
    // "target": "ES2015",才可以
    // 1.私有字段以#字段开头,有时候我们称之为自由名称
    // 2.私有字段不能再包含的类之外访问,甚至不能检测到
    #name;
    greet() {
        console.log(`Hello,my name is ${this.#name}`);
    }
}
let semlinker = new Person('Semlinker');
semlinker.greet();
/**
 * #私有字段与 private 的区别
 *
 * private   如果将类转成any类型可以访问private装饰的字段
 *  # 号定义的 ECMAScript 私有字段，会通过 WeakMap 对象来存储，同时编译 器会生成 __classPrivateFieldSet 和 __classPrivateFieldGet 这两个方法用于设置值和获取 值。

 */ 
//# sourceMappingURL=2..ECMAScript%E7%A7%81%E6%9C%89%E5%AD%97%E6%AE%B5.js.map