'use strict';

/**
 * 栈遵从 LIFO 原则,基于数组的实现
 *
 */
class Stack {
    constructor(initElement = []) {
        this.items = [];
        this.items = initElement;
    }
    push(element) {
        if (Array.isArray(element)) {
            this.items = this.items.concat(element);
        }
        else {
            this.items.push(element);
        }
    }
    pop() {
        return this.items.pop();
    }
    /**
     * 查看栈顶元素
     */
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    clear() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    toString() {
        return this.items.toString();
    }
}

/**
 * 将数字转成二进制
 * @param decNumber
 * @returns
 */
function baseConverter(decNumber, base = 2) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 进制对应的转化
    let number = decNumber;
    let rem;
    let binaryString = '';
    if (!(base >= 2 && base <= 36)) {
        return '';
    }
    while (number > 0) {
        // 除于2,求余
        rem = Math.floor(number % base);
        // 结果入栈
        remStack.push(rem);
        number = Math.floor(number / base);
    }
    while (!remStack.isEmpty()) {
        // 一个个出栈,拼接字符串
        const digitsIndex = remStack.pop();
        if (digitsIndex != undefined) {
            binaryString += digits[digitsIndex];
        }
    }
    return binaryString;
}
console.log(baseConverter(233));
console.log(baseConverter(10));
console.log(baseConverter(1000));
console.log(baseConverter(100345, 2)); // 11000011111111001 
console.log(baseConverter(100345, 8)); // 303771 
console.log(baseConverter(100345, 16)); // 187F9 
console.log(baseConverter(100345, 35)); // 2BW0
