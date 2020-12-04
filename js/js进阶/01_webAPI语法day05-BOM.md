---
typora-copy-images-to: media
---

> 第02阶段.前端基本功.webAPI

# 基础语法

## 学习目标

* 理解
  - 什么是BOM
  - 什么是url


* 重点

  * 掌握页面加载事件
  * 掌握一个完整url的组成部分
  * 掌握location对象常用的方法和属性
  * 掌握history对象常用的方法
  * 掌握navigator对象的userAgent属性的作用
  * 掌握设置定时器的两种方法
  * 掌握移除定时器的方法
    ​


##1.BOM

**概念: **BOM(Browser Object Model) 是指浏览器对象模型,浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。BOM由多个对象组成，其中代表浏览器窗口的Window对象是BOM的顶层对象，其他对象都是该对象的子对象。

**通俗理解: ** 把浏览器当做对象,通过访问对象的属性,实现操作浏览器的一组方法

![BOM](media\浏览器.png)

## 2. 页面加载事件

###2.1 load事件

```javascript
window.onload = function () {
  
  // 当页面加载完所有内容（包括图像、脚本文件、CSS 文件等）执行
}
```

###2.2 unload事件

```javascript
window.onunload = function () {
  // 当用户退出页面时执行(关闭页面)
}
```



### 小结:

window.onload事件 是页面所有资源加载完成时触发

window.onunload事件 是用户退出页面时触发

##3.location对象

> location 相当于浏览器地址栏的抽象, 通过window.location可以访问到,window可以忽略不写
>
> 我们学习location对象,目的是为了操作地址栏里面的url地址

![location](media\location.png)

### 3.1 URL

####3.1.1 什么是url

**概念:**统一资源定位符 (Uniform Resource Locator, URL)

**通俗理解:** 互联网中的地址

#### 3.1.2 URL的组成

![url](media\url.png)

- scheme:通信协议

		常用的http,ftp,maito等

- host:主机 (找计算机)

		服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。

- port:端口号 (找软件)

		整数，可选，省略时使用方案的默认端口，如http的默认端口为80。

- path:路径

		由零或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。

- query:查询

		可选，用于给动态网页传递参数，可有多个参数，用'&'符号隔开，每个参数的名和值用'='符号隔开。

		例如：name=zs

- fragment: 信息片断

		字符串，锚点.

###3.2 location有哪些成员？

> 成员: 属性和方法又叫做成员

- href     返回地址栏的整个url,设置值的时候,也可以起到跳转页面的作用

- hash    返回地址栏url的fragment

- host     返回地址栏url的主机名

- search   返回地址栏url的键值对参数(query)

- reload()  设置页面刷新

  **语法:** location.reload([boolean]) 

  >参数是一个布尔值,不传参数则默认是false. 普通刷新,可能会从缓存拿数据
  >
  >传true的话,是强制刷新.强制浏览器去服务器获取数据

- assign()   设置页面跳转,记录历史

  **语法:** location.assign('url地址')

- replace() 设置页面跳转,不记录历史

  **语法:**location.replace('url地址')



###小结: 

- location对象代表浏览器的地址栏.
- 学习location的目标主要是为了操作地址栏的url地址
- 网络中的地址我们称为url

##4.history对象

- back() 返回上一个页面

  **语法:** history.back();

- forward() 前进到下一个页面

  **语法: **history.forward();

- go(1/-1)  前进/ 返回

  **语法:** history.go(number);

  >正数是前进,负数是后退.

  ```javascript
  history.go(1); //前进一步
  history.go(2); //前进两步
  history.go(-3); //后退三步
  ```

##5.navigator对象

- userAgent  返回识别客户端设备和浏览器的字符串

  **语法:** navigator.userAgent



##6. 定时器

### 6.1 设置定时器

#### 6.1.1 setTimeout()

**作用:** 到达间隔时间之后,只调用一次回调函数

**语法: ** window.setTimeout(回调函数, 间隔时间) 

> - window可以省略
> - 间隔时间以毫秒为单位
> - 返回这个定时器的标识符,是数字类型

```javascript
// 创建一个定时器，1秒后执行
// timerId指向这个定时器的标识符
var timerId = setTimeout(function () {
  console.log('Hello World');
}, 1000);
```



####6.1.2 setInterval()

**作用:** 每隔一个间隔时间,就调用一次回调函数

**语法: ** window.setInterval(回调函数, 间隔时间) 

>- window可以省略
>- 间隔时间以毫秒为单位
>- 返回这个定时器的唯一标示符,是数字类型

```javascript
// 创建一个定时器，每隔1秒调用一次
//timerId 指向这个定时器的标识符
var timerId = setInterval(function () {
  var date = new Date();
  console.log(date.toLocaleTimeString());
}, 1000);
```



### 6.2 清除定时器

#### 6.2.1 clearTimeout()

**作用: **清除以setTimeout方法设置的定时器

**语法:** widnow.clearTimeout(定时器的标识符)   window可以忽略

#### 6.2.2 clearInterval()

**作用: **清除以setInterval方法设置的定时器

**语法:** widnow.clearInterval(定时器的标识符)   window可以忽略



### 小结:

- 设置定时器  setTimeout 和 setInterval
- 清除定时器 clearTimeout 和 clearInterval



**案例：**

倒计时
简单动画

### 

## 6. 课后综合练习

钟表案例




## 7. 扩展内容@



###7.1 name 和top 的特殊性:

​	name 和 top 是window 对象本身存在的属性

​	name 是字符串,给name赋值为其他类型,也会转换成字符串

​	top 是只读的属性,指向window对象,不可写

​	**注意:** 

​	在全局申明变量,不要使用name 或者top

