"use strict";
exports.__esModule = true;
var isValid = function (s) {
    var arr = [];
    var len = s.length;
    if (len == 0)
        return true;
    if (len % 2 !== 0)
        return false;
    for (var i = 0; i < len; i++) {
        var cur = s[i];
        switch (cur) {
            case '{':
                arr.push(cur);
                break;
            case '(':
                arr.push(cur);
                break;
            case '[':
                arr.push(cur);
                break;
            case '}':
                if (arr.pop() !== '{')
                    return false;
                break;
            case ')':
                if (arr.pop() !== '(')
                    return false;
                break;
            case ']':
                if (arr.pop() !== '[')
                    return false;
                break;
            default:
                break;
        }
    }
    return !arr.length;
};
console.log(isValid('{{}}'));
