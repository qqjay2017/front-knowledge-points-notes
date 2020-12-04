import java.util.HashMap;
import java.util.Map;

/**
 * 方法二：两遍哈希表
为了对运行时间复杂度进行优化，我们需要一种更有效的方法来检查数组中是否存在目标元素。如果存在，我们需要找出它的索引。保持数组中的每个元素与其索引相互对应的最好方法是什么？哈希表。

通过以空间换取速度的方式，我们可以将查找时间从 O(n)O(n) 降低到 O(1)O(1)。哈希表正是为此目的而构建的，它支持以 近似 恒定的时间进行快速查找。我用“近似”来描述，是因为一旦出现冲突，查找用时可能会退化到 O(n)O(n)。但只要你仔细地挑选哈希函数，在哈希表中进行查找的用时应当被摊销为 O(1)O(1)。

一个简单的实现使用了两次迭代。在第一次迭代中，我们将每个元素的值和它的索引添加到表中。然后，在第二次迭代中，我们将检查每个元素所对应的目标元素（target - nums[i]target−nums[i]）是否存在于表中。注意，该目标元素不能是 nums[i]nums[i] 本身！



复杂度分析：

时间复杂度：O(n)O(n)，
我们把包含有 nn 个元素的列表遍历两次。由于哈希表将查找时间缩短到 O(1)O(1) ，所以时间复杂度为 O(n)O(n)。

空间复杂度：O(n)O(n)，
所需的额外空间取决于哈希表中存储的元素数量，该表中存储了 nn 个元素。



 */

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer,Integer>  map=     new HashMap<>();
        for(int i =0;i<nums.length;i++){
            map.put(nums[i],i);
        }
         for(int i =0;i<nums.length;i++){
              int complement = target - nums[i];
              if(map.containsKey(complement) && map.get(complement) != i){
                  return new int[] {i,map.get(complement)};
              }
         }
          throw new IllegalArgumentException("No two sum solution");
    }
}