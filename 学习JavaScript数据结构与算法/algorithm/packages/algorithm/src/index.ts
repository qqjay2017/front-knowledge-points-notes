import {Stack} from '@algorithm/stack'

/**
 * 将数字转成二进制
 * @param decNumber 
 * @returns 
 */

function baseConverter(decNumber:number,base=2){
    const remStack = new Stack<number>()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 进制对应的转化
    let number = decNumber;
    let rem;
    let binaryString = ''
    if(!(base>=2 && base<=36)){
        return ''
    }
    while(number>0){
        // 除于2,求余
        rem = Math.floor(number % base);
        // 结果入栈
        remStack.push(rem)
        number = Math.floor(number/base)
    }

    while(!remStack.isEmpty()){
        // 一个个出栈,拼接字符串
        const digitsIndex = remStack.pop()
        if(digitsIndex!=undefined){
            binaryString += digits[digitsIndex]
        }
      
    }
    return binaryString
}

console.log(baseConverter(233))
console.log(baseConverter(10))
console.log(baseConverter(1000))
console.log(baseConverter(100345, 2)); // 11000011111111001 
console.log(baseConverter(100345, 8)); // 303771 
console.log(baseConverter(100345, 16)); // 187F9 
console.log(baseConverter(100345, 35)); // 2BW0 