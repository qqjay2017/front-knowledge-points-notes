// 第一种写法
const add = (function (totalLength) {
  let allArgs = [];
  function _add(...args) {
    allArgs = [...allArgs, ...args];

    if (allArgs.length >= totalLength) {
      const ret = allArgs.reduce((memo, cur) => memo + cur, 0);
      allArgs = [];
      return ret;
    } else {
      return _add;
    }
  }
  return _add;
})(5);

console.log(add(1, 2, 3, 4, 5)); // 15
console.log(add(1)(2)(3)(4)(5)); //15
console.log(add(1, 2)(3, 4, 5)); //15

console.log("-------------");

function add1(...args) {
  let _add = add1.bind(null, ...args);
  _add.toString = function () {
    return args.reduce((memo, cur) => memo + cur, 0);
  };
  return _add;
}

console.log(add1(1, 2, 3, 4, 5).toString()); // 15
console.log(add1(1)(2)(3)(4)(5).toString()); //15
console.log(add1(1, 2)(3, 4, 5).toString()); //15

console.log("------");

/**
 * 柯里化
 * 把接收多个参数的函数,变成接收一个单一参数的函数,并且返回接收余下参数,返回结果的技术
 */

function curry(fn, ...args) {
  return args.length < fn.length
    ? (...innerArgs) => curry(fn, ...args, ...innerArgs)
    : fn(...args);
}

function addFn(a, b, c, d, e) {
  return a + b + c + d + e;
}

let curryAdd = curry(addFn);

console.log(curryAdd(1, 2, 3, 4, 5), "curryAdd"); // 15
console.log(curryAdd(1)(2)(3)(4)(5), "curryAdd"); //15
console.log(curryAdd(1, 2)(3, 4, 5), "curryAdd"); //15
