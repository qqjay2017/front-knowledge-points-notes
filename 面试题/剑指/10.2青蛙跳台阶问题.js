// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法

//  https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/solution/mian-shi-ti-10-ii-qing-wa-tiao-tai-jie-wen-ti-dong/

var numWays = function(n) {
    if(n ==0){
        return 1
    }else if(n==1){
        return 1
    }else if(n==2){
        return 2
    }else if(n>2){
     
        return  numWays(n-1)+numWays(n-2)
    }

};



console.log(numWays(7))

// 动态规划
// dp[i+1]=dp[i]+dp[i−1] ，即对应数列定义 f(n + 1) = f(n) + f(n - 1)f(n+1)=f(n)+f(n−1) ；
var numWays1 = function(n) {

    let a=1;
    let b=1;
    let sum =0;

    for(let i=0;i<n;i++){
        sum = (a+b) % 1000000007
        a=b
        b=sum
    }
    return a

};

console.log(numWays1(7))