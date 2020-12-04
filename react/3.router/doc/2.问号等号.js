// /^\/post\/?(?=\/|$)/i
// ?=  正向肯定查找,不消耗字符

// 任意数字后面要跟一个小写字母,这么写不消耗字符(正向前瞻,不移动指针)
// console.log('1a'.match(/\d(?=[a-z])[a-z]/))
// 这么写消耗字符
// console.log('1a'.match(/\d[a-z][a-z]/))

/**
 * 匹配捕获
 * 匹配不捕获
 * 正向前瞻
 * 正向后瞻
 * 反向前瞻
 * 反向后瞻
 */


// 加小括号分组,表示匹配捕获,也会被捕获到
// [ 'lab', 'a', index: 0, input: 'lab', groups: undefined ]
// console.log('lab'.match(/l([a-z])[a-z]/))

// 非分组捕获  ?:  分组,但是不捕获
// [ 'lab', index: 0, input: 'lab', groups: undefined ]
// console.log('lab'.match(/l(?:[a-z])[a-z]/))

// 正向肯定前瞻  ?=    a没被消耗掉,还会拿去匹配后面的
// console.log('lab'.match(/l(?=[a-z])[a-z]b/))
// 正向否定前瞻  ?!  后面不能是什么,a没被消耗掉,还会拿去匹配后面的
// console.log('lab'.match(/l(?![A-Z])[a-z]b/))

// 反向肯定
console.log('1a'.match(/(?<=[a-z])\d[a-z]/))
// 反向否定
console.log('1a'.match(/(?<![a-z])\d[a-z]/))

