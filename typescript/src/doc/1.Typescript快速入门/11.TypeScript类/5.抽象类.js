/**
 * 抽象类不能被实例化
 * 因为里面包含抽象方法
 * 所谓抽象方法,是指不包含具体实现的方法
 * */
class Person {
    constructor(name) {
        this.name = name;
    }
}
// 抽象方法不能被实例化
// const lolo = new Person()
class Developer extends Person {
    constructor(name) {
        super(name);
    }
    say(words) {
        console.log(`${this.name} say ${words}`);
    }
}
const lolo = new Developer('lolo');
lolo.say('I love ts');
export {};
//# sourceMappingURL=5.%E6%8A%BD%E8%B1%A1%E7%B1%BB.js.map