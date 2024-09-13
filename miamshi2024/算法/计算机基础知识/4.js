/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }
  const res = [];
  // 多少行
  const rows = matrix.length;
  // 多少列
  const columns = matrix[0].length;
  // 访问标记
  const visited = new Array(rows).fill(false).map(() => new Array(columns).fill(false));
  const total = rows * columns;
  const order = new Array(total).fill(0);

  // 方向索引,当前行,当前列
  let directionIndex = 0, row = 0, column = 0;

  // 设置方向向量
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

 

  for (let i = 0; i < total; i++) {
    order[i] = matrix[row][column];

    visited[row][column] = true;

    const nextRow = row + directions[directionIndex][0];
    const nextColumn = column + directions[directionIndex][1];
    // 如果下一个点位超出边界,或者已经访问过,则改变方向
    if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns || visited[nextRow][nextColumn]) {
      directionIndex = (directionIndex + 1) % 4;
    }

    row = row + directions[directionIndex][0];
    column = column + directions[directionIndex][1];
  }
  return order;
};

const r = spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]);
console.log(r);
