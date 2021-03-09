// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，
// 输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。




// 暴力查找
// var findNumberIn2DArray = function (matrix, target) {
//     matrix = matrix.filter(f=>f[0]<=target).map(f=>{

//         return f.filter(num=>num<=target)
//     })
//     return !!matrix.find(m=>{
//         return m.find(num=>num==target)
//     })
// };


// 线性查找
var findNumberIn2DArray = function (matrix, target) {
    let rows = matrix[0].length
    let columns = matrix.length
    let row = 0;
    let column = columns - 1;
    while (row < rows && column >= 0) {
        let num = matrix[row][column]
        if (num == target) {
            return true
        } else if (num > target) {
            column--;
        } else {
            row++
        }
    }
    return false
};

console.log(findNumberIn2DArray([
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
], 20))