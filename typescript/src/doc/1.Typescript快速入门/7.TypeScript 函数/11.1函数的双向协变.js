/**
 * 原因:为了类型安全,为了使用时候不报错
 * 返回值类型是协变的,而参数类型是逆变的
 * 返回值类型可以传子类,参数可以传父类(参数只能少,返回值只能多)
 */
// 例子
class Animal {
}
class Dog extends Animal {
    constructor() {
        super(...arguments);
        this.name = "dog";
    }
}
class WhiteDog extends Dog {
    constructor() {
        super(...arguments);
        this.age = 10;
    }
}
class BlackDog extends Dog {
    constructor() {
        super(...arguments);
        this.home = "beijing";
    }
}
let animal = new Animal();
let dog = new Dog();
let whiteDog = new WhiteDog();
let blackDog = new BlackDog();
function exec(callback) {
    //    callback(animal)     // error animal没有name属性
    //    callback(WhiteDog)  // ok
    callback(dog);
}
let childToChild;
// exec(childToChild) // error
// ok
exec(function (blackDog) {
    // blackDog 被转成了Dog类型
    return blackDog; // 返回值也被装成了Dog
});
let childToParent;
let parentToParent = animal => animal;
// exec(parentToParent)  // error
// ok,两个都变成了Dog
exec(function (animal) {
    return animal;
});
let parentToChild = (animal) => blackDog;
exec(parentToChild); // ok
exec(function (animal) {
    console.log(animal);
    return blackDog;
});
export {};
//# sourceMappingURL=11.1%E5%87%BD%E6%95%B0%E7%9A%84%E5%8F%8C%E5%90%91%E5%8D%8F%E5%8F%98.js.map