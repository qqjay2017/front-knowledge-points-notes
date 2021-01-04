"use strict";
const inhabitantsOfMunich = 1464301;
const distanceEarthSunInKm = 149600000;
const fileSystemPermission = 504;
const bytes = 262926349;
// 分隔符不会改变数值字面量的值，但逻辑分组使人们更容易一眼就能读懂数字。
"use strict";
// var inhabitantsOfMunich = 1464301; 
// var distanceEarthSunInKm = 149600000; 
// var fileSystemPermission = 504;
// var bytes = 262926349;
/**
 * Number()
     parseInt()
     parseFloat()
     用于解析数字的函数是不支持分隔符:
 */
const RE_NON_DIGIT = /[^0-9]/gu;
function removeNonDigits(str) {
    str = str.replace(RE_NON_DIGIT, '');
    return Number(str);
}
//# sourceMappingURL=2.%E6%95%B0%E5%AD%97%E5%88%86%E9%9A%94%E7%AC%A6.js.map