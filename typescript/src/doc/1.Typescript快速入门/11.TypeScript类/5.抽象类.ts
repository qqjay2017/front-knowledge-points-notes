/**
 * 抽象类不能被实例化
 * 因为里面包含抽象方法
 * 所谓抽象方法,是指不包含具体实现的方法
 * */

abstract class Person {
    constructor(public name:string) {
    }

    abstract say(words:string):void
}

// 抽象方法不能被实例化
// const lolo = new Person()

class  Developer extends Person {
    constructor(name:string) {
        super(name);
    }
    say(words: string): void {
        console.log(`${this.name} say ${words}`)
    }

}

const lolo = new Developer('lolo');
lolo.say('I love ts')


export  {}