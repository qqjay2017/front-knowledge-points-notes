/**
 * 双指针
 * 时间复杂度O(n)
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
   let p =0;
   let q=1;
   let length = nums.length;
   while(q<length){
       if(nums[p]!==nums[q]){
          if(q-p>1){
            nums[p+1] = nums[q];
          }
           p++;
       }
       q++;
   }
   return p+1;
     
  };
removeDuplicates(
    [0, 0, 1, 1, 1, 2, 2, 3, 3, 4])