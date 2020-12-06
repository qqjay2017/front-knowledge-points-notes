(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * 原因:为了类型安全,为了使用时候不报错
     * 返回值类型是协变的,而参数类型是逆变的
     * 返回值类型可以传子类,参数可以传父类(参数只能少,返回值只能多)
     */
    // 例子
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "dog";
            return _this;
        }
        return Dog;
    }(Animal));
    var WhiteDog = /** @class */ (function (_super) {
        __extends(WhiteDog, _super);
        function WhiteDog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.age = 10;
            return _this;
        }
        return WhiteDog;
    }(Dog));
    var BlackDog = /** @class */ (function (_super) {
        __extends(BlackDog, _super);
        function BlackDog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.home = "beijing";
            return _this;
        }
        return BlackDog;
    }(Dog));
    var dog = new Dog();
    var whiteDog = new WhiteDog();
    var blackDog = new BlackDog();
    function exec(callback) {
        //    callback(animal)     // error animal没有name属性
        //    callback(WhiteDog)  // ok
        callback(dog);
    }
    // exec(childToChild) // error
    // ok
    exec(function (blackDog) {
        // blackDog 被转成了Dog类型
        return blackDog; // 返回值也被装成了Dog
    });
    // exec(parentToParent)  // error
    // ok,两个都变成了Dog
    exec(function (animal) {
        return animal;
    });
    var parentToChild = function (animal) { return blackDog; };
    exec(parentToChild); // ok
    exec(function (animal) {
        console.log(animal);
        return blackDog;
    });

}());
//# sourceMappingURL=bundle.js.map
