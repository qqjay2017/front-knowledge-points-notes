const reg1 = /\$\{(.+?)\}/g;
const str1 = 'qwer${tyu}123${asd}';

console.log(str1.match(reg1))   // [ '${tyu}', '${asd}' ]