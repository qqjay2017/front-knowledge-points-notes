/**
 * O(n)
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let i = 0;
    let length = nums.length;
    while (i < length) {
        if (nums[i] >= target) break
        i++;
    }
    return i;

};

searchInsert([1, 3, 5, 6], 2)