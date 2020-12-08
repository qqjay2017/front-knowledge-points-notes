
const inhabitantsOfMunich = 1_464_301;
const distanceEarthSunInKm = 149_600_000;
const fileSystemPermission = 0b111_111_000; const bytes = 0b1111_10101011_11110000_00001101;

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
function removeNonDigits(str: string) {
    str = str.replace(RE_NON_DIGIT, ''); return Number(str);
}