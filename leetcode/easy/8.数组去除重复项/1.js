/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let curIndex = 1;
      let length = nums.length;
      let map = {};
      map[nums[0]] = nums[0];
    
      for (let i = 1; i < length; i++) {
        
         
          if (map[(nums[i])]==undefined) {
             
              nums[curIndex] = nums[i];
              map[nums[i]] = nums[i];
              curIndex++;
             
          }
  
      }
   
      return curIndex;
     
  };
removeDuplicates(
    [0, 0, 1, 1, 1, 2, 2, 3, 3, 4])