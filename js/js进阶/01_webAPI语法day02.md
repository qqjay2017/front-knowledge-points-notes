---
typora-copy-images-to: media
---

> 第02阶段.前端基本功.webAPI

# 基础语法

## 学习目标

* 重点

  * 掌握DOM中常用的表单元素的属性
  * 掌握DOM中操作元素样式的两种方式
  * 掌握DOM中操作标签的自定义属性方法

  ​

## 1. DOM 中常用的表单元素的属性

- value 用于大部分表单元素的内容获取(option除外)
- type 可以获取input标签的类型(输入框或复选框等)
- disabled 禁用属性
- checked 复选框选中属性
- selected 下拉菜单选中属性



**案例 :** 

- 点击按钮禁用文本框
- 设置下拉框中的选中项
- 全选反选



###小结:  

disabled, checked, selected 这些布尔值属性,在DOM中通过true/false修改状态

true 是让属性的作用生效,false 为不生效

## 2. DOM中操作样式的两种方式

- 通过元素的style属性
- 通过元素的className属性



### 2.1 通过style属性操作样式

**注意:** 通过style属性设置样式时,css中要写单位的属性,在js代码中也要加单位

**示例代码 : **

```javascript
//html
<div id="box"></div>

//js
var box = document.getElementById('box');
box.style.width = '100px';
box.style.height = '100px';
box.style.backgroundColor = 'red';

//通过style属性设置样式执行完毕之后的html标签的变化
//相当于给标签添加了行内样式

<div id="box" style="width:100px; height:100px; background-color:red">
```



###2.2 通过className操作样式

**示例代码 : **

```javascript
//html
<div id="box"></div>

//css
.show{
     width:100px;
     height:100px:
     background-color:red;
}

//js
var box = document.getElementById('box');
box.className = 'show'

//通过className属性设置样式执行完毕之后的html标签的变化
//相当于给标签添加了类名
<div id="box" class="show">
```

**案例 :** 

- 图片切换二维码案例

- 当前输入的文本框高亮显示

  ​

### 小结:

- 通过style属性操作样式,相当于给标签添加了行内样式
- 通过className属性操作样式,相当于给标签添加了类名



## 3.标签上自定义属性的操作

>为什么要学习操作标签的自定义属性 ?
>
>因为在开发中,有时候会需要给标签上添加一些自定义属性用来存储数据或状态
>但是DOM对象并不能直接使用点语法获取到这些自定义属性的值

###3.1 获取自定义属性的值

**语法:**  element.getAttribute('属性名')  返回对应属性的值 ,如果没有返回null

```javascript
//html
<div id="box" index="0"></div>

//js
var box = document.getElementById('box');
var value = box.getAttribute('index');
console.log(value) // 0
```



###3.2设置自定义属性的值

**语法:**  element.setAttribute('属性名', '属性的值')  返回undefined

```javascript
//html
<div id="box" ></div>

//js
var box = document.getElementById('box');
box.setAttribute('index', 0); 

//js代码执行完毕之后.html的标签的变化
<div id="box" index="0"></div>

```



###3.3 移除自定义属性的值

**语法:**  element.removeAttribute('属性名')  返回undefined

```javascript
//html
<div id="box" index="0"></div>

//js
var box = document.getElementById('box');
box.removeAttribute('index'); 

//js代码执行完毕之后 html的标签的变化
<div id="box" ></div>
```





**案例 :** 

- 列表隔行变色、高亮显示



### 小结:

- 操作自定义属性的这三个方法,不仅可以操作自定义属性,同时也可以操作html规范中的属性
- 设置的属性的值,最终都转换成了字符串的形式



## 4. 课后综合练习

tab选项卡切换



## 5. 扩展内容@

- DOM对象的dataset属性方式获取data-xxx方式定义的属性

>由于我们经常需要在标签上自定义属性来存储数据或状态,但是如果用传统的方式操作起来比较繁琐,而且不熟悉html规范的人,很容易把自定义的属性和html规范的属性混淆.为了更加方便,高效的实现这个需求,我们可以使用dataset属性

使用DOM对象的dataset属性,操作自定义属性时要注意的三点问题:

1. 在标签上定义属性时,要以data-为前缀
2. 在js中获取/设置通过data-定义的属性的值时,要通过dataset来获取/设置

   ​

```javascript
//html
<div id="box" data-index="0" i="0"></div>

//js
var box = document.getElementById('box');
console.log(box.dataset) //返回一个对象,里面包含了所有当前标签上用data-定义的属性
console.log(box.dataset.index) //返回data-index 的值

```

## 6.深度阅读@

[dataset详解](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)