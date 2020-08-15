/**
 * 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
 * 并且返回接受余下的参数且返回结果的新函数的技术。通俗点说就是将一个函数拆分成多个函数
 */


function add(a, b) {
    return a + b;
}


var currying1 = function(fn) {
    // 切割第一个参数(add函数),后面的参数作为add的参数
    var args = [].slice.call(arguments, 1);
    return function() {
        // currying1返回的函数
        var newArgs = args.concat([].slice.call(arguments));
        // 指向add
        return fn.apply(this, newArgs);
    }
}


var addCurry1 = currying1(add);
console.log(addCurry1(1, 2))