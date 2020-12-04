/**
 * 第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面，
 * 如下：{1:222, 2:123, 5:888}，
 * 请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。 
 */
var obj = {
    1:222, 
    2:123, 
    5:888
}

//不使用es6
// obj.length=12;
// for(var i=0;i<obj.length;i++){
//     if(obj[i] == undefined){
//         obj[i]=null;  
//     }
// }
// var arr = [];
// arr = Array.prototype.slice.call(obj,0);
// console.log(arr);

//使用es6
const result = Array(12).fill(null).map((item,i)=>obj[i+1]||null);
console.log(result);