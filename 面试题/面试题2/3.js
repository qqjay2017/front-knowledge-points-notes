
function noSame() {
    let str = 'CanvasRenderingContext2D';
    let strArr = str.split('')
    const strSet = new Set(strArr)
    let str2 = ''
    strSet.forEach(s => {
        str2 += s
    })
    let str3 = str2.split('').reverse().join('')
    let len = str3.split('').filter(s => s.match(/^[A-Z]/)).length
    return {
        str2, str3, len
    };
}
console.log(noSame())