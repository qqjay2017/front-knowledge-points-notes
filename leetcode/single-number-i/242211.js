var getCount = function(nums,count) {
    let ans = 0;
      for(const num of nums){
            // 第i位是否为,是1的话就
             ans ^=num;
         
        }
    return ans;
};



console.log(getCount([2,2,3,8,8,9,9,10,10,3,15]))
