var reverse = function(x){
    var isNegative = x<0;
    var target = ((isNegative? -x: x).toString().split("").reverse().join(''))
    target = isNegative? -target:+target;
    var outRange = target <Math.pow(-2,31) || target > (Math.pow(2,31)-1);
    
    return outRange? 0: target;
}

console.log(reverse(720120))


console.log(Math.pow(-2,31))