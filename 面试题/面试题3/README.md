1.一个树形结构结构

```js
var tree = [
  {
    id:1,
    children:[
      {
        id:2,
      },
      {
        id:3,
      }
    ]
  },
  {
    id:4
  }
]
```

1.1 如何查询到id为3的对象

方式1:广度遍历

```js
function findId(tree, id) {
    let newTree = tree;
    let index = 0;
    let res;
    while(newTree[index]){
        let current = newTree[index]
        if(current.id == id){
            res = current
            break
        }else if(current.children){
            newTree = newTree.concat(current.children)
        }
        index++
    }
    return res;
}

console.log(findId(tree, 3))
```

方式2: 递归

```js
function findId(tree, id) {
    for(let i=0;i<tree.length;i++){
        let current = tree[i]
        if(current.id == id){
            console.log(current)
            break
        }else if(current.children){
            findId(current.children,id)
        }
    }
}
```


2.try catch 能不捕获到 Promise 内部发生的错误

不能

宏任务:会被window.onerror捕获到

微任务会被
```
window.addEventListener('unhandledrejection', function() {
	console.log(...arguments)
})
```
捕获到


3. HTTP缓存要设置什么参数在请求头才能实现

看http

4. 当列表数据过多的时候,滚动会发生卡顿,如何解决

虚拟列表
interselectionObserve

5. this指向问题,可以不可以在除了class以外的所有地方禁用this,会不会产生问题?

6. for foreach map  哪个最快?为什么

map最慢,因为要做一个新数组,返回
foreach在中间,因为foreach要处理this问题
for最快

7. Map 对象是什么? 作用?

做映射
当键值对的键不是字符串的时候

8. this指向问题,可以不可以在除了class以外的所有地方禁用this,会不会产生问题?

可以

9. 一个 正整数 数组,如何求内部的最大和

10. 如果有一个1GB文件上传,你要如何做

分片  

11. 文件切割怎么保证服务端接收到的数量就是你切割后的数量

12. 那100个文件要发生101次请求,如何优化

13. 可以在所有的文件中都额外加上数量字段,也可以只在一个中加上,因为无论是没收到数量还是数量不对,服务端都可以判断出来

14. 简单说一下 HTTP 的协商缓存如何实现

15. 设计一个删除文章的接口,需要如何设计,从请求方式,参数,返回值等

16. flex：1 会有什么效果？弹性布局都有什么属性

16. 如何实现三列布局


17. {} 和 Map 对象查找哪个更快

Map快
1. 普通对象继承了很多原型方法，如toString
而map是干净的！
2. Map的键是有序的
3. Map是可迭代的

18. get和post的区别是什么?


20. 代码用到了reduce,解释一下reduce内部是怎么实现的?

21. 如果数据分成100个,中间存不存在被人篡改的可能,如果被篡改,要怎么识别发现?

22. 