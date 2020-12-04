/**
 * 用数学方法,转成相反的数字
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    // 如果是负数一定不是回文数
    if (x < 0) {
        return false;
    }
    // 生成的新的数字
    var cur = 0;
    var num = x;
    while(num!=0){
        cur = cur*10 +num%10;
        num = parseInt(num/10); 
        if(cur > Infinity /10){
            return false;
        }
       
    }

    return cur === x;

}

console.log(isPalindrome(121121))