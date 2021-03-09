// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
// 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


var minArray = function(numbers) {
    let i=0
    while(numbers[i+1]==0||!!numbers[i+1]){
        if(numbers[i]>numbers[i+1]){
            return numbers[i+1]
        }else{
            i++
        }
    }
};

console.log(minArray([2,2,2,0,1]))

// 二分查找法