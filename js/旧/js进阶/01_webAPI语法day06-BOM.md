---
typora-copy-images-to: media
---

> 第02阶段.前端基本功.webAPI

# 基础语法

## 学习目标

* 重点

  * 掌握offset系列属性
  * 掌握clientWidth和clientHeight
  * 掌握scroll系列的属性
  * 掌握如何获取浏览器可视区的大小
  * 掌握如何获取整个页面滚动出去的距离


## 1. 特效

### 1.1 offset系列

- offsetParent  用于获取定位的父级元素
- offsetLeft 距离定位父元素的左偏移量
- offsetTop 距离定位父元素的上偏移量
- offsetWidth 当前元素的宽度
- offsetHeight 当前元素的高度

![1498743216279](media/1498743216279.png)

**小问题**:

offsetParent和parentNode的区别?

- offsetParent 返回的是离自己最近的定位父元素
- parentNode 返回的是直接父元素



### 1.2.client系列

- clientWidth 元素可视区的宽度  
- clientHeight 元素可视区的高度



![1504075813134](media/1504075813134.png)

### 1.3.scroll系列

- scrollLeft 元素中内容左侧滚动出去的距离
- scrollTop  元素中内容顶部滚动出去的距离
- scrollWidth   元素中内容的宽度
- scrollHeight   元素中内容的高度



![1498743288621](media/1498743288621.png)

### 小结:

- offset, client, scroll系列返回的都是数字类型(Number)
- 返回的值是所有样式渲染到页面上的最终结果



### 1.4. 获取浏览器可视区的大小

- window.innerWidth  浏览器可视区的宽度
- window.innerHeight  浏览器可视区的高度

### 1.5.获取页面滚动出去的距离

- window.pageYOffset  顶部滚动出去的距离
- window.pageXOffset  左侧滚动出去的距离






​

## 2. 扩展内容@

###2.1 client系列其他

- clientLeft  返回元素左边框的宽度
- clientTop  返回元素上边框的宽度

###2.2 window.innerWidth 和 window.innerHeight的兼容问题

 **ie8及以下不支持**

ie8及以下的浏览器中:

window.innerWidth ===> document.docuementELement.clientWidth

window.innerHeight ===> document.docuementELement.clientHeight



### 2.3 window.pageXOffset 和window.pageYOffset 的兼容问题

 **ie8及以下不支持**

ie8及以下的浏览器中:

window.pageXOffset ===> document.docuementELement.scrollLeft

window.pageYOffset ===> document.docuementELement.scrollTop