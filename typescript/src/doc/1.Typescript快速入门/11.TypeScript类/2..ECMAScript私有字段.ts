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
