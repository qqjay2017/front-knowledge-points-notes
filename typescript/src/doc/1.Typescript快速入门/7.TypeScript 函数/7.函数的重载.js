// 函数的重载
function toArray(value) {
    if (typeof value === 'number') {
        return value.toString().split('').map(item => parseInt(item));
    }
    else {
        return value.split('');
    }
}
;
// v在定义重载的时候，⼀定要把最精确的定义放在最前⾯。
export class Calculator {
    add(a, b) {
        if (typeof a === 'string' || typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }
}
const calculator = new Calculator();
console.log(calculator.add(222, '222'));
//# sourceMappingURL=7.%E5%87%BD%E6%95%B0%E7%9A%84%E9%87%8D%E8%BD%BD.js.map