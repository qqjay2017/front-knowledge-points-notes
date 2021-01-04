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
//# sourceMappingURL=7.1compose%E6%A1%88%E4%BE%8B.js.map