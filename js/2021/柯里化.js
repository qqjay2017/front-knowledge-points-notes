/**
 * bind返回新的函数
 * 使用call实现bind
 * 会有构造函数new的问题,instanceof指向错误
 */
// (function (prototype) {
//   function bind(context, ...outerArgs) {
//
//     return (...innerArgs) => {
//       this.call(context, ...outerArgs, ...innerArgs);
//     };
//   }
//   prototype.bind = bind;
// })(Function.prototype);

/**
 *
 * bind实现高级版,考虑new的情况进去
 */

~(function (prototype) {
  prototype.bind = function (context, ...outerArgs) {
    Object.create = function (prototype) {
      function F() {}
      F.prototype = prototype;
      return new F();
    };
    let thatFunc = this;
    let fBound = function (...innerArgs) {
      // 如果this instanceof thatFunc,说明是new 的
      return thatFunc.apply(this instanceof thatFunc ? this : context, [
        ...outerArgs,
        ...innerArgs,
      ]);
    };
    fBound.prototype = Object.create(thatFunc.prototype);

    return fBound;
  };
})(Function.prototype);

function sum(...args) {
  return (
    this.prefix +
    args.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    )
  );
}

let obj = {
  prefix: "$",
};

const bindSum = sum.bind(obj, 1, 2, 3);

console.log(bindSum(4, 5));

console.log("----------------");

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return this.x + "," + this.y;
};

let emptyObj = {};
let YPoint = Point.bind(null, 1);
let axiosPoint = new YPoint(2);

console.log(axiosPoint.toString());
console.log(axiosPoint instanceof YPoint); //true
console.log(axiosPoint instanceof Point); //true
