/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var romanMap = {
        I: { count: 1 },
        V: { count: 5 },
        X: { count: 10 },
        L: { count: 50 },
        C: { count: 100 },
        D: { count: 500 },
        M: { count: 1000 }
    }
    var temp = s.split('');
    var result = 0;
    for(let i=temp.length-1;i>=0;i--){
    if(temp[i]=='I' && (temp[i+1]=='V' || temp[i+1]=='X')){
        result -=  romanMap[temp[i]].count
       }else  if(temp[i]=='X' && (temp[i+1]=='L' || temp[i+1]=='C')){
        result -=  romanMap[temp[i]].count
       }else  if(temp[i]=='C' && (temp[i+1]=='D' || temp[i+1]=='M')){
        result -=  romanMap[temp[i]].count
       }else {
        result += romanMap[temp[i]].count
       }
    }
    return result
};


console.log(romanToInt("M"))