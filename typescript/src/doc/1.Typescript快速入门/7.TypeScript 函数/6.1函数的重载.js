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
export {};
//# sourceMappingURL=6.1%E5%87%BD%E6%95%B0%E7%9A%84%E9%87%8D%E8%BD%BD.js.map