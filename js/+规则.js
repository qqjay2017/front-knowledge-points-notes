/**
 * 
 * 
 * 1.如果左右都是数字,直接相加出结果
 * 2.如果其中有一个是string,另一个也转成string,字符串拼接出结果
 * 3.如果是对象/数组这种复杂的数据结构,两个都转成字符串,拼接
 * 4.布尔值转number,相加
 * 5. []+{},因为[]会被强制转成"",然后加{}, {} 会被强制转成
 * Object.prototype.toString.call({}) = '[object object]',
 * 所以结果是'[object object]'
 * 6.{} 当做一个空代码块时候,+[]是强制将[]转成number , 转换的过程是  +[] => +"" => 0,最终结果就是0
 */ 

Object.prototype.toString.call({}) = '[object object]'


console.log({}+[]    )//0
console.log([]+{}    )// [object object]
console.log({} +0 )//0
console.log([] +0 )//"0"