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
var Parent = /** @class */ (function () {
    function Parent(name) {
        this.name = name;
        this.name = name;
    }
    Parent.prototype.getName = function () {
        console.log(this.name);
    };
    Parent.staticParentName = "staticParentName";
    Parent.getCtaticParentName = function () {
        console.log(Parent.staticParentName);
    };
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.age = age;
        _this.age = age;
        return _this;
    }
    Child.prototype.getAge = function () {
        console.log(this.age);
    };
    Child.staticChildName = "staticChildName";
    Child.getCtaticChildName = function () {
        console.log(Child.staticChildName);
    };
    return Child;
}(Parent));
var child = new Child('zhufeng', 10);
exports.child = child;
child.getName();
child.getAge();
Child.getCtaticChildName();
Child.getCtaticParentName();
