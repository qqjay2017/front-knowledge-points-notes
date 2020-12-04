/**
 * 数字转字符串,再装数组,然后用下标检查
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    // 如果是负数一定不是回文数
    if (x < 0) {
        return false;
    }
    var temp = x.toString().split('');
    var strIndex = 0;
    var endIndex = temp.length - 1;
    while (strIndex < endIndex) {
        if (temp[strIndex] === temp[endIndex]) {
            strIndex++;
            endIndex--;
        } else {
            return false;

        }
    }
    return true;
};

console.log(isPalindrome(121))