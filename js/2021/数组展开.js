let arr = [[1], [2, 3], [4, 5, 6, [7, 8, 9, [11]]], 12];

// 方式1: flat函数
console.log(arr.flat(Infinity));

// 方式2:
console.log(
  arr
    .toString()
    .split(",")
    .map((item) => Number(item))
);

console.log(
  JSON.stringify(arr)
    .replace(/\[|\]/g, "")
    .split(",")
    .map((item) => Number(item))
);
// 方式3
let arr2 = [[1], [2, 3], [4, 5, 6, [7, 8, 9, [11]]], 12];
while (arr2.some((item) => Array.isArray(item))) {
  arr2 = [].concat(...arr2);
}
console.log(arr2, "arr2");
