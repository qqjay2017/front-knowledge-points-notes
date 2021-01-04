// ts中的装饰器
// 扩展属性和方法
// https://www.tslang.cn/docs/handbook/decorators.html
// 开启装饰器     "experimentalDecorators": true,   
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 类装饰器   target: TFunction - 被装饰的类
function modifier(target) {
    target.prototype.say = function () {
        console.log('say');
    };
}
// 属性装饰器  1.target: Object - 被装饰的类 2.propertyKey: string | symbol - 被装饰类的属性名
function toUpCase(target, key) {
    let value = target[key];
    Object.defineProperty(target, key, {
        get() {
            return value.toString().toUpperCase();
        },
        set(newVal) {
            value = newVal;
        }
    });
}
// 静态属性装饰器  和属性装饰器一样
function staticDec(target, key) {
    let value = target[key];
    Object.defineProperty(target, key, {
        get() {
            return value.toUpperCase();
        }
    });
}
// 方法装饰器  1.target: Object - 被装饰的类 2. propertyKey: string | symbol - ⽅法名 3. descriptor: TypePropertyDescript  - 属性描述符
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
// 参数装饰器
function required(target, propertyKey, parameterIndex) {
    console.log(target, propertyKey, parameterIndex);
}
let Person = class Person {
    constructor() {
        this.name = 'zf';
    }
    getName(p1) {
    }
};
Person.context = 'staticContext';
__decorate([
    toUpCase
], Person.prototype, "name", void 0);
__decorate([
    enumerable(false),
    __param(0, required)
], Person.prototype, "getName", null);
__decorate([
    staticDec
], Person, "context", void 0);
Person = __decorate([
    modifier // 语法糖,只是为了简单一点
], Person);
const p = new Person();
console.log(p);
export {};
//# sourceMappingURL=8.%E8%A3%85%E9%A5%B0%E5%99%A8.js.map