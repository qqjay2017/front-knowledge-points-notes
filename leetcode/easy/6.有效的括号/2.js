"use strict";
exports.__esModule = true;
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.get = function () {
        return this.items[this.items.length - 1];
    };
    return Stack;
}());
function isValid(s) {
    if (!s)
        return true;
    if (s.length == 1 || (s.length % 2 !== 0))
        return false;
    var stack = new Stack();
    var temp = {
        '(': {
            type: 'left',
            part: ')'
        },
        '{': {
            type: 'left',
            part: '}'
        },
        '[': {
            type: 'left',
            part: ']'
        },
        ')': {
            type: 'right',
            part: '('
        },
        '}': {
            type: 'right',
            part: '{'
        },
        ']': {
            type: 'right',
            part: '['
        }
    };
    for (var i = 0; i < s.length; i++) {
        var cur = s[i];
        if (temp[cur].type == 'left') {
            stack.push(cur);
        }
        else if (temp[cur].type == 'right' &&  temp[stack.get()] && temp[stack.get()].part == cur) {
            stack.pop();
        }
        else {
            return false;
        }
    }
    return !stack.get();
}
console.log(isValid('{{}}'));
