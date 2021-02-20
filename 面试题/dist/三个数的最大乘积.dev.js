"use strict";

var unsortedArray = [-10, 7, 2, 3, 5, -1, -7];
/**
 * 给定一个整数数组，找到从三个整数中产生的最大乘积
 * @param {*} array 
 */

function computeProduct(array) {
  var sortedArray = array.sort(function (a, b) {
    return a - b;
  });
  var array_n_element = sortedArray.length - 1;
  var product1 = 1;
  var product2 = 1;

  for (var x = array_n_element; x > array_n_element - 3; x--) {
    product1 = product1 * sortedArray[x];
    console.log(product1, x, 'product1');
  }

  product2 = sortedArray[0] * sortedArray[1] * sortedArray[array_n_element];
  if (product1 > product2) return product1;
  return product2;
}

console.log(computeProduct(unsortedArray));