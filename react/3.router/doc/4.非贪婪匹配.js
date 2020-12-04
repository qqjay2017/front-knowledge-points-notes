

// [ 'aaaaa' ]  默认是贪婪匹配
console.log('aaaaa'.match(/([a-z])+/))   
// [ 'a', 'a', 'a', 'a', 'a' ] 
// ? 0个或一个  
// +?  非贪婪匹配  ?加在量词后面表示是否贪婪,  
console.log('aaa111'.match(/([a-z])+?/))  

// + 至少有一个