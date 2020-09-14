"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Dog';
        return _this;
    }
    return Dog;
}(Animal));
var BlackDog = /** @class */ (function (_super) {
    __extends(BlackDog, _super);
    function BlackDog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.age = 10;
        return _this;
    }
    return BlackDog;
}(Dog));
var WhiteDog = /** @class */ (function (_super) {
    __extends(WhiteDog, _super);
    function WhiteDog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.home = '北京';
        return _this;
    }
    return WhiteDog;
}(Dog));
var animal;
var blackDog;
var whiteDog;
function exec(callback) {
    callback(whiteDog);
}
var childToChild = function (blackDog) { return blackDog; };
exec(childToChild);
var parentToChild = function (animal) { return blackDog; };
exec(parentToChild);
function exec2(callback) {
    callback('');
}
var parentToChild2 = function (a) { return ''; };
exec2(parentToChild2);
// 在 TypeScript 中， 参数类型是双向协变的 ，也就是说既是协变又是逆变的，而这并不安全。但是现在你可以在 TypeScript 2.6 版本中通过 --strictFunctionTypes 或 --strict 标记来修复这个问题
