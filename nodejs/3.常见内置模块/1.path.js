/**
 * 路径url
 * linux/mac   /
 * window       \,有的是\\,有的是/
 * 为了屏蔽操作系统之间的差异,在开发中对于路径的操作我们可以使用path模块
 * 
 */

/**
 * 可移植操作系统接口
 * POSIX: 
 * linux和macos都实现了POSIX接口
 * window部分电脑实现了POSIX接口
 */

const path =require('path')

// 1.获取路径的信息
// 1.1获取目录
console.log(path.dirname(__dirname))
// 1.2 文件或者文件夹的名称
console.log(path.basename('./1.path.js'))
// 1.3 后缀名
console.log(path.extname('./1.path.js'))

// 2.join 路径的拼接


// 3. resolve 也是拼接,resolve会判断拼接的路径字符串中,是否以/ ./ ../ 开头的路径
