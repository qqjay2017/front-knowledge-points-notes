compose()('zf'); // R对应'zf'
compose((str) => { })('zf');
compose((str) => str, (str2) => str2)('zf');
compose((str) => str, (str1) => str1, (str2) => str2)('zf');
// 实现
export default function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg;
    }
    if (funcs.length == 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
//# sourceMappingURL=10.4compose%E6%B3%9B%E5%9E%8B.js.map