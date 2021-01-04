class Animal {
}
class Dog extends Animal {
    constructor() {
        super(...arguments);
        this.name = 'Dog';
    }
}
class BlackDog extends Dog {
    constructor() {
        super(...arguments);
        this.age = 10;
    }
}
class WhiteDog extends Dog {
    constructor() {
        super(...arguments);
        this.home = '北京';
    }
}
let animal;
let blackDog;
let whiteDog;
function exec(callback) {
    callback(whiteDog);
}
const childToChild = (blackDog) => blackDog;
const parentToChild = (animal) => blackDog;
exec(parentToChild);
function exec2(callback) {
    callback('');
}
const parentToChild2 = (a) => '';
exec2(parentToChild2);
export {};
// 在 TypeScript 中， 参数类型是双向协变的 ，也就是说既是协变又是逆变的，而这并不安全。但是现在你可以在 TypeScript 2.6 版本中通过 --strictFunctionTypes 或 --strict 标记来修复这个问题
//# sourceMappingURL=2.%E5%87%BD%E6%95%B0%E7%9A%84%E5%8D%8F%E5%8F%98%E4%B8%8E%E9%80%86%E5%8F%98.js.map