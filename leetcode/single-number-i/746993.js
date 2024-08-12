/**
 * 对于每一位，我们使用位运算,统计在所在位上,数字中1的总出现次数。
 * 如果1出现的次数被3求余等于0,说明答案的该位上是0
 * 如果1出现的次数被3求余不等于0,说明答案的该位上是1,所以给该位赋值1
 * @param {*} nums
 * @returns
 */

var singleNumber = function (nums) {
  let ans = 0;
  for (let i = 0; i < 32; ++i) {
    let total = 0;
    for (const num of nums) {
      // 第i位是否为,是1的话就
      total += (num >> i) & 1;
    }

    if (total % 3 != 0) {
      ans |= 1 << i;
    }
  }
  return ans;
};

var singleNumber3 = function (nums) {
  let ans = 0;
  for (let i = 0; i < 32; ++i) {
    let total = 0;
    for (const num of nums) {
      const isOne = (num >> i) & 1;
      total += isOne;
    }
    if (total % 3 != 0) {
      ans |= 1 << i;
    }
  }
  return ans;
};

console.log(singleNumber3([2, 2, 3, 2]));

// console.log(singleNumber([2,2,3,2]))
// console.log(singleNumber([3,3,2,3,4,4,4]))
// console.log(singleNumber([2,2,3,2,4,4,4]))

var singleNumber2 = function (nums) {
  let ans = 0;
  for (let i = 0; i < 32; ++i) {
    let total = 0;
    for (const num of nums) {
      // 第i位是否为,是1的话就
      total += (num >> i) & 1;
    }

    if (total % 2 != 0) {
      ans |= 1 << i;
    }
  }
  return ans;
};

// console.log(singleNumber2([2, 2, 3, 4, 4, 8, 8]));
