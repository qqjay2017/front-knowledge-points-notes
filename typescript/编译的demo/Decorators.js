var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var a;
(function (a) {
    //当装饰器作为修饰类的时候，会把构造器传递进去
    function addNameEat(constructor) {
        constructor.prototype.name = "zhufeng";
        constructor.prototype.eat = function () {
            console.log("eat");
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            addNameEat
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(a || (a = {}));
var b;
(function (b) {
    //还可以使用装饰器工厂
    function addNameEatFactory(name) {
        return function (constructor) {
            constructor.prototype.name = name;
            constructor.prototype.eat = function () {
                console.log("eat");
            };
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            addNameEatFactory('zhufeng')
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(b || (b = {}));
var c;
(function (c) {
    //还可以替换类,不过替换的类要与原类结构相同
    function enhancer(constructor) {
        return /** @class */ (function () {
            function class_1() {
                this.name = "jiagou";
            }
            class_1.prototype.eat = function () {
                console.log("吃饭饭");
            };
            return class_1;
        }());
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(c || (c = {}));
