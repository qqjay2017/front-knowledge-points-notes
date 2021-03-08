---
typora-copy-images-to: media
---

> 第02阶段.前端基本功.webAPI

# 基础语法

## 学习目标

* 理解
  - 什么是节点
  - 什么是DOM树


* 重点

  * 掌握创建元素的三种方式

  * 掌握节点的常用属性和方法

    ​

  ​

## 1. 节点

### 1.1 什么是节点：

根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点(文档,标签,文本,属性,注释)

- 整个文档是一个文档节点
- 每个HTML标签是一个标签节点/元素节点
- HTML 标签内的文本是文本节点
- 每个HTML标签的属性是属性节点
- 注释是注释节点




![节点](media/节点.png)



### 1.2 什么是DOM树 

当浏览器加载文档的时候,会将文档中每一个节点,以树状的结构组织起来,我们将这种结构称为之节点树或DOM树

![OM_TRE](media\DOM_TREE.gif)



### 1.3 节点中常用的属性和方法

#### 1.3.1 节点类型的属性

- nodeType  节点的类型
  - 1 元素节点
- nodeName  节点的名称
- nodeValue  节点值
  - 元素节点的nodeValue始终是null

#### 1.3.2 节点层级的属性

![节点层级](media/nodes.jpg)

- 找儿子的属性:
  - children  返回包含所有子元素的伪数组
  - childNodes 返回包含所有的子节点的伪数组
- 找父亲的属性:
  - parentNode 返回父节点
- 找兄弟
  - nextElementSibling 返回下一个兄弟元素
  - previousElementSibling 返回上一个兄弟元素

    ​

#### 1.3.3 操作节点的方法

- appendChild() 往节点的内容后面添加一个子节点

  **语法:**  父节点.appendChild(子节点)

  ```javascript
  //html
  <div id="far">
      <div id="one"></div>
  </div>
  <div id="two"></div>

  //js
  var far = document.getElementById('far');
  var two = document.getElementById('two');
  far.appendChild(two);

  //js执行之后的效果
  <div id="far">
      <div id="one"></div>
  	<div id="two"></div>
  </div>
  //appendChild方法会将一个节点添加到另一个节点内容的尾部,如果这个被添加的节点是本身在页面上存在的,则会有剪切的效果
  ```


  

- insertBefore() 往节点里面添加一个子节点,这个子节点的位置在参考子节点之前

  **语法: **node.insertBefore(要插入的节点, 参考子节点)

  ```javascript
   //html
    <div id="far">
        <div id="one"></div>
    </div>
    <div id="two"></div>

    //js
    var far = document.getElementById('far');
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    far.insertBefore(two,one)

    //js执行之后的效果
    <div id="far">
        <div id="two"></div>
        <div id="one"></div>
    </div>
    //insertBefore是插入到参考节点之前,也有剪切的效果
  ```

  ​


- removeChild() 移除某个子节点

  **语法: **node.removeChild(要被删除的节点); 返回被移除的节点

  ```javascript
  //html
  <div id="far">
      <div id="son"></div>
  </div>

  //js
  var far = document.getElementById('far');
  var son = document.getElementById('son');
  var result = far.removeChild(son);
  console.log(result);  //<div id="son"></div>

  //js执行之后的效果
  <div id="far">
  </div>
  ```

  ​

- replaceChild() 替换节点使用其他节点替换掉自己的某个子节点

  **语法: **element.replaceChild(替换的节点, 被替换的子节点);

  ```javascript
  //html
  <div id="far">
      <div id="one"></div>
  </div>
  <div id="two"></div>

  //js
  var far = document.getElementById('far');
  var one = document.getElementById('one');
  var two = document.getElementById('two');
  far.replaceChild(two,one);

  //js执行之后的效果
  <div id="far">
      <div id="two"></div>
  </div>
  //也有剪切的效果
  ```

  ​

- cloneNode() 克隆节点

  **语法: **element.cloneNode([true]) ;  

  参数是boolean值,不传参数默认是false,为浅拷贝.传true,则是深拷贝

  ​

  ```javascript
  //html
  <div id="box">
      div里面的内容
  	<p>p元素</p>
  </div>

  //js
  var box = document.getElementById('box');
  console.log(box.cloneNode()); //<div id="box"></div>

  console.log(box.cloneNode(true)) //<div id="box">  div里面的内容 <p>p元素</p> </div>
  ```

  ​



### 小结:

- 有剪切效果的方法:
  - appendChild()
  - insertBefore()
  - replaceChild()
- 移除的方法
  - removeChild()
- 需要传递两个参数的方法:
  - insertBefore(要插入的节点, 参考节点) 
  - replaceChild(替换的节点, 被替换的节点)




**案例:**

选水果


## 2. 创建元素的三种方式

###2.1 innerHTML

**语法:**  element.innerHTML = '标签字符串'

```javascript
//html
<div id="box">
    这是div中的内容
</div>

//js
var box = document.getElementById('box');
box.innerHTML = '<p>这是动态增加的p标签</p>'

//js代码执行完毕之后的结果
<div id="box">
    <p>这是动态增加的p标签</p>
</div>

```



### 2.2 docuement.write()

**语法:**  document.write('标签字符串')

```javascript
//html
<body>
</body>

//js
document.write('<div>这是动态增加的p标签</div>')

//js代码执行完毕之后的结果
<body>
    <div>
    	这是动态增加的p标签
	 </div>
</body>

```





### 2.3 document.createElement()

**语法:**  document.createElement('标签名')

```javascript
///html
<div id="box">
</div>

//js
var newElement = document.createElement('p'); //此时新创建出来的newElement并没有加入到DOM树中
var box = document.getElementById('box');
box.appendChild(newElement);// 通过appendChild这个方法,将新元素添加到已经在DOM树中的元素中,这样新
//创建出来的元素才会添加到DOM树中,然后渲染到页面上展示出来


//js代码执行完毕之后的结果
<div id="box">
    <p></p>
</div>
```



###小结:  

innerHTML 会覆盖原来元素里面的内容,并且会将新的元素直接渲染到页面上,但是不推荐用来创建表格(常用)

document.write() 也会直接渲染到页面上,并且在事件中执行的话,会覆盖原来页面的内容(慎用)

docuement.createElement() 只是在内存中创建出来一个元素,但是并没有添加到DOM树中(常用)






## 3. 课后综合练习

- 动态创建列表，高亮显示
- 根据数据动态创建表格

  ​



## 4. 扩展内容@

### 4.1 节点层级的其他属性

- firstChild  返回第一个子节点
- lastChild   返回最后一个子节点
- firstElementChild 返回第一个子元素
- lastElementChild  返回最后一个子元素
- nextSibling 返回下一个兄弟节点
- previousSibling 返回上一个兄弟节点



###4.2 节点属性的兼容性问题:

- children 在ie6-8浏览器中返回的内容会包含注释节点
- firstElementChild  ie9+才支持
- lastElementChild   ie9+ 才支持
- nextElementSibling  ie9+才支持
- previousElementSibling ie9+才支持

###4.3 创建元素的三种方式的效率问题

- document.write() 和 innerHTML都是解析字符串执行效率相同
- document.createElement 直接创建元素,执行效率比前两者高很多
- document.write() 和 innerHTML优化后的代码效率跟document.createElement类似

​

## 5.深度阅读@

[浏览器的重绘与重排](https://kb.cnblogs.com/page/169820/)