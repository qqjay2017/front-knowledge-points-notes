// 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
// 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

var fib = function (n) {
    if (n == 0) {
        return 0
    } else if (n == 1) {
        return 1
    } else {
        return fib(n - 1) + fib(n - 2)
    }
};

console.log(fib(15))