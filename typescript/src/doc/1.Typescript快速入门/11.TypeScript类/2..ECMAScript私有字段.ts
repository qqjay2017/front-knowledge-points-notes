/**
 *  // 私有字段
 */

 export default  class  Person {

    // "target": "ES2015",才可以
    // 1.私有字段以#字段开头,有时候我们称之为自由名称
    // 2.私有字段不能再包含的类之外访问,甚至不能检测到
    readonly #name:string;
    constructor(name:string ) {
        this.#name = name;
    }
    greet(){
        console.log(`Hello,my name is ${this.#name}`)
    }
}

let semlinker =   new Person('Semlinker');
 semlinker.greet()

 /**
  * #私有字段与 private 的区别
  * 
  * private   如果将类转成any类型可以访问private装饰的字段
  *  # 号定义的 ECMAScript 私有字段，会通过 WeakMap 对象来存储，同时编译 器会生成 __classPrivateFieldSet 和 __classPrivateFieldGet 这两个方法用于设置值和获取 值。

  */