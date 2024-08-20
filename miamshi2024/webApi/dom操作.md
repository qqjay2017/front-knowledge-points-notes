

- JS基础语法(ECMA标准)

- JS web api,网页操作的API,W3C标准

## JS Web API



### DOM


- dom是哪种数据结构

树形结构

- dom操作的常用api


新增,插入节点

移动节点
现有节点,append,就会移动

获取子元素列表


childNodes,再根据nodeType,tagName判断

Array.prototype.slice.call(div1.childNodes).filter()



获取父元素
parentNode

删除

div1.removeChild(child[0])

- attr和property的区别


```js
const pList = document.querySelectorAll('p');
const p1 = pList[0];
// attr设置属性,对html节点做修改,会改变html结构
 p1.getAttribute('style')
p1.setAttribute('data-name','imooc');
// property设置属性,是对dom的js属性做修改,不会提现到html中
p1.style.width=100;

```


都会引起dom重新渲染

### DOM操作考虑性能


DOM操作非常昂贵,避免频繁的DOM操作
- 对DOM查询做缓存
const xx = document.getElementById('aaa')

- 一次性插入多个dom,将频繁操作改为一次性操作

 document.createDocumentFragment()

### BOM


browser Object Model



- navigator

- screen

- location

- history


history.back()
history.forwark()


- 如何识别浏览器的类型

- 分析拆解url的各个部分



 

### 事件绑定

题目 : 编写一个通用的时间监听函数


e.target ;这个事件是谁触发的


事件冒泡

无线下拉的图片列表,如何监听每个图片的点击



- 事件代理
代码简洁,减少浏览器内存占用
但是,不要滥用


### ajax



### 存储