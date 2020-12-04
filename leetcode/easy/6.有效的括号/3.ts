/**
 * 思路 :
 * 循环,走一个switch
 * @param s 
 */


var isValid = function (s) {
    let arr = [];
    let len = s.length;
    if (len == 0) return true;
    if (len % 2 !== 0) return false;
    for (let i = 0; i < len; i++) {
        let cur = s[i];
        switch (cur) {
            case '{':
                arr.push(cur)
                break;

            case '(':
                arr.push(cur)
                break;


            case '[':
                arr.push(cur)
                break;


            case '}':
                if (arr.pop() !== '{') return false;
                break;

            case ')':
                if (arr.pop() !== '(') return false;
                break;

            case ']':
                if (arr.pop() !== '[') return false;
                break;


            default:
                break;
        }
    }

    return !arr.length;
}

console.log(isValid('{{}}'))

export {

}