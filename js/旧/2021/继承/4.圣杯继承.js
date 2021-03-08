var inherit = (function () {
    var F = function () { }
    /**
     * Origin 子类
     * Target 父类
     */
    return function (Origin, Target) {
        F.prototype = Target.prototype;
        Origin.prototype = new F()
        Origin.prototype.construct = Origin;
        Origin.prototype.uber = Origin.prototype
    }
})()