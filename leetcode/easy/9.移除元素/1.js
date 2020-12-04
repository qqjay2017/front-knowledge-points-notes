/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let p=0;
    let i=0;
    while(i<nums.length){
         let cur = nums[i];

         if(cur!=val){
             if(i>p){
                 nums[p] = cur;
             }
             p++;
         }


        i++;
    }

  return p

};

removeElement([0,1,2,2,3,0,4,2],2)