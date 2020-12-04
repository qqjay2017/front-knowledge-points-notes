 # 开发工具

> 工欲善其事，必先利其器

## 前端开发工具介绍

+ sublime text：收费的代码编辑器 ,打开速度快,效率高
+ Visual Studio Code（vs code）:微软开发的免费编辑器,集成终端效果好!
+ atom：github发布的代码编辑器
+ webstorm：誉为`web前端开发神器`, 但是 合成的插件和配置太多,导致开启速度慢 , 适合初学者!
  - 如果大家安装,安装 11 版本,,,不要下载最新的,,部分电脑系统兼容问题很大!
+ HBuilder：国产的web开发工具

**用什么工具不重要，目的都是为了写代码，用熟了都一样**

## vscode 安装插件使用

1. open in browser 打开默认浏览器   `alt+B` ;

2. Path intellisense  自动提示路径 :

   ​



## vscode 的其他用法

1. 隐藏右边迷你预览图  => 查看 => 切换小视图

2. 侧边栏左右切换 :  =>查看 => 向右切换侧边栏 

3. 打开文件夹 : => 文件 => 打开文件夹

4. 资源管理器中:新建文件 + 新建文件夹 + 刷新 + 全部折叠文件夹

5. 代码块:  

   ```js
   ctrl + shift + p/或者设置(左下角右下角的齿轮)=> 命令面板 => 搜索:snippet => 找到:首选项:配置用户代码片段  =>搜 js/html/cs => 找到javascript.json => 
   ```

6. 配置:   设置(左下角齿轮 => 设置 => 复制粘贴 => ctr+S)

   ```js
   // 将设置放入此文件中以覆盖默认设置
   {
       //自动保存
       "files.autoSave": "afterDelay",
      
        // 以像素为单位控制字号。
        "editor.fontSize": 18,
        //一个制表符等于的空格数
        "editor.tabSize": 2,
        // 自动更新扩展
        "extensions.autoUpdate": false,
        //关掉自动更新
        "update.channel": "none",
        // 通过使用 tab 键 补全代码
        "emmet.triggerExpansionOnTab": true,
       "window.zoomLevel": 1,
       "vsicons.dontShowNewVersionMessage": true,
       "workbench.startupEditor": "newUntitledFile",
       "workbench.sideBar.location": "right",
       "explorer.confirmDelete": false
     }
   ```

   ​

## vscode 常用快捷键

1. Ctrl + / : 注释

2. Alt+B : 快速开启浏览器

3. 复制 :  shift + alt + ↓

4. 移动 :  alt + ↓

5. 格式化代码规范 :  shift + alt + F

6. 折叠侧边栏 : Ctrl + B 

7. ctr + ` =>  切换vscode终端

8. 浏览器调出控制台

   F12  打开控制台

   mac双系统的 F12 = fn+F12

**以前讲过的 : **

1. Ctrl+N : 新建
2. Ctrl + C : 复制  ( 光标在这一行即可)
4. Ctrl + X : 删除当前行 
5. Ctrl+Z   撤销这一次操作
6. Ctrl+Shift+Z :  反撤销



# JavaScript介绍

## 为什么要学JavaScript？

+ 网页三部分：

  **HTML**：控制网页的 **结构**

  **CSS**：控制网页的 **样式**

  **JavaScript**：**控制网页的行为** 

  不同于HTML和css，JavaScript是一门编程语言，因此要比HTML和css复杂一些，学习的时间也更长。

  [就业班课程介绍](http://www.itcast.cn/course/web.shtml) 

+ 最初的javascript

  + 用于判断客户端的输入（表单校验）

+ 现在的JavaScript：`现在的JS无所不能`
  + 异步与服务器交互（AJAX）
  + 网页和特效（演示）
  + 服务端开发（nodejs）
  + 命令行工具开发（nodejs）
  + 桌面程序（Electron）
  + app开发（ReatNative）
  + 控制硬件--物联网（Ruff）
  + 游戏开发（cavans, cocos2d-js）


+ 网页特效 : 
  - [美女相册](http://www.webhek.com/post/3d-album.html)
  - [Canvas游戏](https://www.html5tricks.com/8-html5-canvas-animation.html)

## 什么是JavaScript？

- **概念**  : JavaScript 是一种运行在 **客户端**  的 **脚本语言**  
- 客户端 : 相对服务端而言的 ;   移动客户端 + PC客户端 (浏览器)
- 脚本语言 : 
  - 编译语言：Java/C/C++/OC/Swift...       运行代码之前,把所有的代码**先编译**一遍,再运行每一行代码
  - 脚本语言：JavaScript/PHP/Python...  **运行一行解析一行**,不需要提前编译 , 非编译语言




## JavaScript历史

+ 1995年，Netscape(网景)公司的`Brendan Eich(布兰登·艾奇)`（伊利诺伊大学香槟分校），花了10天时间为Netscape Navigator2.0开发了一个位置为`LiveScript`的脚本程序，目的是在浏览器中执行预检测程序（表单校验）
+ 后来Netscape在与Sun合作之后将其改名为JavaScript。目的是为了利用 Java 这个因特网时髦词汇。
+ 微软发布了 IE 3.0 并搭载了一个 JavaScript 的克隆版，叫做 JScript（这样命名是为了避免与 Netscape 潜在的许可纠纷）
+ 三足鼎立阶段：
  + CEnvi的scriptEase
  + Netscape的JavaScript
  + IE的JScript
+ 标准化阶段：1997年，ECMA（欧洲计算机制造商协会）邀请了Netscape、Sun、微软、Borland等公司的一些程序员组成了TC39，最终锤炼出来了ECMA-262，该标准定义了一门全新的脚本语言，名为`ECMAScript`。

## javascript的组成 (记忆)

![](imgs/javascript.png)

+ ECMAScript - JavaScript的核心，描述了语言的基本语法和数据类型，ECMAScript是一套标准，定义了一种语言的标准,与具体实现无关
+ DOM：一套操作网页元素的API
+ BOM：一套操作浏览器功能的API

# JavaScript入门

## JavaScript书写位置

- 第一种 : 写在`script`标签中

```html
<script>
  alert('Hello World!');
</script>
```

- 第二种 : 引入一个js文件

```html
<script src="main.js"></script>
```

**注意：**

1. script 可以放在很多地方,,但是我们一般规范些在body里面,放在 html 下面;
	.  使用src 引入的标签 不能再在标签内写js代码里	



## 注释

> 注释代码不会被执行，仅仅起到一个提示的作用。注释可以对复杂的代码进行解释，方便后期的维护和开发。

- 单行注释 : 

  ```js
  // 这是单行注释， 单行注释只能写一行代码
  //  快捷键： ctrl + /  
  ```

- 多行注释 :

  ```js
  /*
  	这是多行注释，在多行注释中可以
  	换行
  	sublime Text :  快捷键  ctrl + shift + /
  	vscode : 选中多行直接注释,即可,但是这种多行注释 如果需要得自己手写
  /*
  ```

- 在写代码的时候，需要写注释，这是一个良好的习惯,   

- 大家初学,一定多写注释 ! 把理解的知识再写一遍,效果会更好!!

## 输出语句 (5种)

+ **alert : 警告框**

  ```js
  //alert会弹出一个警告框
  alert("hello world");
  ```

+ **confirm : 确认框**

  ```js
  //confirm弹出一个确定框
  confirm("我帅吗？");
  ```

+ **prompt : 输入框**

  ```js
  //prompt:弹出一个输入框，可以输入值
  prompt("请输入你的真是年龄");
  ```

+ **document.write : 网页中写入内容**

  ```js
  //可以识别标签
  document.write("hello world");
  document.write("<h1>hello world</h1>");
  ```

+ **控制台输出**

  ```js
  //F12打开控制台，在console中可以看到打印的信息
  console.log("hello word");
  ```

  ​

  **总结**：alert、comfirm、prompt 三个用户体验太差，只有在学习的时候会用到。`console.log`经常用来打印日志，项目调试的时候非常有用。

  ​

# 变量

> 变量 :  可以变化的量   
>
> 变量的作用 :  存储数据   
>
> 声明 :  用 **var** 来声明

## 如何使用变量

- 直接声明变量

  ```js
  //  var 来声明变量的
  //  age : 变量名
  //  结构 : var + 变量名 ; 
   var age;
   console.log
  ```

  ​

- 先声明,后赋值

  ```js
  var name;  // 声明一个变量 name
  name = '小马哥'; // 一个等号 是赋值,,后面的值赋值给前面的
   console.log
  ```

  ​

- 同时声明+赋值

  ```js
  var name = '小马哥' 
   console.log
  ```

  ​

- 同时声明多个变量并赋值

  ```js
  var age = 10,name= 'zs' 
  // 相当于
  var age = 10;
  var name = 'zs';
  ```

  ​

- 不声明变量，直接赋值(不会报错，但是不推荐)

  ```js
  //  没有用 var 修饰的不管代码在哪里都是全局的
  // 不推荐 
  height=100;
  console.log(height);
  ```

  ​

- 不声明变量，也不赋值变量，直接使用（会报错）

  ```js
   //   weight is not defined 要知道是没有定义,,估计是变量名写错了
   console.log(heightt);
  ```

**结论：**

- 变量需要声明之后，才能使用，养成一个良好的编程习惯。
- javascript代码一旦报错了，后面的代码就不再执行了。



## 变量的命名规则和规范

- **规则** : ( 必须遵守的,不遵守会报错 ) 

  - 由**字母**、**数字**、**下划线**、**$符号**组成 ; 

  - **不能以数字开头**

  - 区分**大小写**

  - **不能**是**关键字**和**保留字** (不用死记 , 慢慢就见多了)

    ```js
      //关键字：对于js来说有特殊意义的一些单词
      //保留字：js保留了一些单词，这些单词现在不用，但是以后要用。
    ```

    ​

- **规范** :  (建议遵守的  不遵守不会报错)

  - 变量名必须**有意义**

  - 遵守**驼峰**命名法。 首字母小写,后面单词的首字母需要大写! 

    myName,   userPassword

- 下面哪些变量名不合法

  ```js
  a	    
  1
  age18
  18age
  2b
  name
  $name
  _sex
  &sex
  theworld
  a b
  class
  ```

关键字：

![](imgs/key1.png)

保留字:

![](imgs/key2.png)

## 变量的练习

1. 交换两个变量的值

   ```js
    var temp = a;
           a = b;
           b = temp;
   ```

   ​

2. 不使用临时变量，交换两个数值变量的值

   ```js
   			//    a      b
   var a = a+b; //    33     21
       b = a-b; //    33      12
       a = a-b; //    21     12
   ```

   ​

   ​

# 数据类型

> javascript中数据类型分为简单数据类型和复杂数据类型，今天只学简单数据类型  ( 5个 )
>
> number、string、boolean、undefined、null
>
> 数值           字符串	    布尔         声明未赋值        空类型



## number-数字类型

> 数字：  11  255 333 1024

### 进制

在javascript中表示一个数字，除了有我们常用的十进制`11, 22,33`等，还可以使用八进制、十六进制表示等。

- 十进制

```javascript
//我们最常用的进制，进行算术运算的时候，八进制和十六进制最终都要转换成二进制,计算机只识别二进制
//逢10进1
var num = 9;
var num = 29;
```

- 八进制

```js
// 0开头的数字， 逢8进1
var num1 = 010;
var num2 = 0121;

// 八进制 0-7  逢八进一 , 10
var ba = 0321; 
// 12 = 2*8^0 + 1*8^1 = 10
// 321 = 1*8^0 + 2*8^1 + 3*8^2 = 1+16+ 192 = 209
console.log(ba);
```

- 十六进制

```javascript
// 0x开头的数字，逢16进1，  数字范围1-9A-F
var num = 0xA;
var num = 0x12;
```

​    **tips : 关于二进制，计算机在只认识二进制，所以所有的代码最终都会转换成二进制数据。**



### 浮点数

> 浮点数就是小数,，比如0.1

+ 浮点数

```javascript
var num = 0.1;
```

+ 科学计数法

```javascript
//当一次数字很大的时候，可以用科学计数法来表示
var num = 5e+5;  //5乘以10的5次方
var num = 3e-3;//3乘以10的-3次方

```

+ 浮点数精度丢失问题

```javascript
//在进行浮点数运算的时候，可能会出现精度丢失的问题
0.1 + 0.2 = 0.30000000000000004;
0.2 + 0.2 = 0.4;
//尽量少用浮点数进行运算，不要让浮点数进行比较。

解决办法 : 根据小数点后面的位数量 乘以对应的整数;
0.1 + 0.2  ==> (0.1*10+0.2*10) / 10 = 0.3
0.01 + 0.02 呢?
```

### 数值范围

```javascript
最小值：Number.MIN_VALUE，这个值为： 5e-324
最大值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308
无穷大：Infinity    1/0
无穷小：-Infinity
```

## 字符串类型

字符串类型，使用双引号 `"`  或者 `'` 包裹起来的字符

```javascript
//双引号和单引号必须成对出现
var str = 'hello world';
var str = "hello world";

var num1 = 12;
var num2 = '12';
可以通过颜色
```

### 字符串长度

每一个字符串都有一个length属性，可以获取到字符串中字符串的个数

```javascript
var str = "akdjflksjdflk";
console.log(str.length);
```

### 转义字符

思考，如何打印?

> - 引号可以嵌套,但是只能相互嵌套,不能嵌套自己  (单双号相互嵌套)
> - 通过转义符

```javascript
// 大家好,我姓"熏",我叫孙悟空
//选择"好看"的外表，还\是'有趣'的灵魂
```

![](imgs/转义字符.png)

### 字符串拼接

+ `+`号具有字符串拼接功能，它能将两个字符串拼接成一个字符串。
+ `+`号同时具有算术加法的功能，它能将两个数字进行相加
+ 如果`+`号两边有一个是字符串，那么就是拼串的功能，如果都是数字，那么就是算数的功能。

```javascript
// 第一种情况 : 字符串 + 字符串
var a = "hello";
var b = "itcast";
console.log(a + b);//字符串拼接功能

// 第二种情况 : 数值 + 数值
var a = 100;
var b = 100;
console.log(a + b);//加法

// 第三种情况 : 字符串 + 数值
var a = 'abc';
var b = 100;
console.log(a + b);//字符串拼接功能
```

---

思考练习 : 

```
'我是'
var name = '小马哥';
拼接成一句话 : 我是小马哥
console.log ( '我是'+name)  还是  console.log ( '我是name');
```



## 布尔类型

> 布尔类型：true 和 false

```javascript
//布尔类型只有两个值
true:表示真
false:表示假
```

**注意：**

​	**1. 区分大小写，不要写成True或者是False了**

​	**2.  'true'  和 true , 前者是字符串类型**



## undefined和null

> 他们都属于获取非正常值的类型

+ undefined表示一个没有赋值的变量
+ null表示一个空的值, ( 例如 : 获取一个元素,id写错了,获取不到,返回一个null)
+ ![](imgs/undefined和null的区别.png)



## 字面量赋值 与 变量赋值

+ 字面量赋值，字面量也叫直接量，一眼能够识别是什么类型的变量，比如`11, "abc", true, false, undefined, null`等都是字面量，可以直接会使用。
+ 变量赋值：浏览器必须要经过声明之后，才认识变量，如果没有声明，直接使用变量是会报错的。

# 操作符

> 变量可以存储数据，我们还需要学习操作符来操作这些数据
>
> 1、 算术运算符
>
> 2、 赋值运算符
>
> 3、 一元运算符
>
> 4、 逻辑运算符
>
> 5、 比较运算符

## 算术运算符

![](imgs/算术运算符.png)

```javascript
//快速的说出以下的结果？
console.log(123 + 123);
console.log("123" + 123);
console.log(123 - 123);
console.log(123 - "123");
console.log(12 * "12");
console.log(12 / 12);
console.log(10 % 2);
```

注意 : 

​	整除 => `余数==0 `  例如: 能被7整除 :  i%7==0

## 赋值运算符

> 赋值运算符有： = , +=, -=, *=, /=, %=

```javascript
var num = 10;
num += 1;   //num = num + 1;
num -= 1;   //num = num - 1;
num *= 2;   //num = num * 2;
num /= 2;   //num = num / 2;
num % = 2;  //num = num % 2;
```

## 一元运算符

一元运算符：只有一个操作数的运算符

二元运算符：有两个操作数的运算符，比如算术运算符、赋值运算符

自增运算符：++

+ 先自增： `++i`
+ 后自增：`i++`

```javascript
异同点 :
1. 相同点 : 代码执行之后, 数值都会 + 1
2. 不同点 : 就是在自增的时候使用就会出现不同

//先自增：
var num = 1;
console.log(++num); //先自增：表示先加1，后返回值

//后自增：
var num = 1;
console.log(num++);// 后自增：表示先返回值，后+1
```

自减运算符：--

+ 先自减：`--i`
+ 后自减：`i--`



练习：

```javascript
//1. 思考思考
var num = 5;
console.log(num++);
console.log(++num);

//2. 猜猜看
var a = 1; var b = ++a + ++a; console.log(b);    
var a = 1; var b = a++ + ++a; console.log(b);    
var a = 1; var b = a++ + a++; console.log(b);    
var a = 1; var b = ++a + a++; console.log(b);  
```

## 逻辑运算符

+ `&&`：与运算符，表示且，只有当两个操作数都为`true`的时候，结果才是`true`
+ `||`：或运算符，表示或，只要有其中一个操作数是`true`,结果就是`true`
+ `!`：非运算符，取反

```javascript
console.log( true && true );
console.log( false && true );
console.log( true && false );
console.log( false && false );

console.log( true || true );
console.log( false || true );
console.log( true || false );
console.log( false || false );

console.log(!true);
console.log(!false);

总结 : 
&&  翻译 : 一个为真,且,,另外一个也为真  => 才为真
1. 两者都为true,才为true
2. 前者为true,,决定权在后者

||  翻译 : 一个为真,或者另外一个为真 => 真
1. 两者有一个为true,结果就为true
2. 前者为false,,决定权在后者

```

## 比较运算符

> 比较运算符也叫关系运算符， <  >  >=  <=   == != === !==， 关系运算符的   **结果是布尔类型**

```javascript
var a = 5;
var b = 6;
console.log(a > b);//大于
console.log(a < b);//小于
console.log(a >= b);//大于等于
console.log(a <= b);//小于等于

console.log(a == b); //相等，只比较值，不比较类型
console.log(a === b); //全等，比较类型和值
console.log(a != b); // 不等， 只判断值，不判断类型
console.log(a !== b); // 不全等 判断值，且判断类型

注意 : 
 数字类型比较和字符串比较是由区别的 
 1. 数字比较 : 24>3;   比较数字大小
 2. 字符串比较 : '24' < '3'   比较首字母大小
 3. 字符串和数字混合比较 : 比较数字内容大小
```

## 运算符优先级

+ `()`的优先级最高
+ 一元运算符(++, --, !)
+ 算术运算符（先`*/%`, 后`+-`）
+ 比较运算符 (先`> < >= <=`， 后`== === != !==`)
+ 逻辑运算符（先`&&`后`||`）

**不用死记，如果不确定的时候，使用()增加优先级**

```javascript
//猜猜看
var result = ((4 >= 6) || ("人" != "狗")) && !(((12 * 2) == 144) && true);
console.log(result);

```

# 类型转换

## 为什么要进行类型转换???

```js
服务器拿回来的数据,有可能是字符串,比如age='18', 
 var age = '18';
 console.log(age+1);
```



## 查看变量的类型

typeof关键字可以查看数据的类型

```javascript
var num = 11;
console.log(typeof num);
num = "abc";
console.log(typeof num);
```

**小技巧：在控制台可以根据颜色来判断数据的类型哦(*^__^*) **



## 转换成 数值 -number

+ **1 Number()**

```javascript
console.log(Number('55'));
Number()可以把任意值转换成数值类型，但是如果字符串中有不是数字的字符，返回NaN
```

- **2  parseInt()** 和 **parseFloat**()

```js
- parseInt()  把整数或者小数都转化为整数;
- parseFloat() 把整数转化整数,把小数转化为小数
var num1 = parseInt("12");  // 12
var num1 = parseInt("12.3"); //12
var num1 = parseFloat("12"); //12
var num1 = parseFloat("12.3");//12.3

var num1 = parseInt("12.3abc");  // 返回12，如果第一个字符是数字会解析知道遇到非数字结束
var num2 = parseInt("abc123");   // 返回NaN，如果第一个字符不是数字或者符号就返回NaN


```

- **3 算术运算    (最常用)**  

```javascript
var str = '500';
console.log(+str);		// 取正
console.log(-str);		// 取负
console.log(str - 0);  +0呢???拼接
```



## 转换成 字符串类型 - string

- **1.  String ( )**

```javascript
var num = 5;
num = String(num);
console.log(num);
```

- **2.  toString ( )**

```javascript
var num = 5;
console.log(num.toString());// 把数值5变成字符串5
//将来所有的数据都会有toString()方法，除了null和undefined
```

- **3.   拼串，(最常用)**

```javascript
var num = 5;
num = num + "";
console.log(num);
```



## 转换成布尔类型

> 所有的值都可以转换成布尔类型

其中 `0`, `""`, `undefined`，`null`，  `NaN`，这几个值会转换成false，其他值都会转换成true

**这个代表的五大基本类型**

```js
// 没有值 => false
// 有值 => true
// number string undefined null 
//  0      ''    

注意 : 
   1. 'false' 它是字符串 
   2.  NaN  => false 
```



- Boolean()

```javascript
console.log(Boolean(1));
console.log(Boolean(0));
```

- !!

```javascript
var a = "abc";
console.log(!!a);
```



# NaN

> NaN: not a number, 表示一个非数字

在js中，NaN用来表示一个非数字的特殊值，当发现无法进行运算时，js不会报错，而是会返回一个NaN

NaN的注意事项：

+ NaN的类型是number类型的，表示一个非数字
+ NaN不等于任何值，包括NaN本身
+ 通过isNaN()可以判断是否是一个数字，返回false的时候，表示是一个数字。

```js
var num = +'abc'
 console.log(num);  //NAN

// 判断是不是文字
var a = 123;
var b = '123';
//  Nan 不是数字 
// true 不是文字
// false 不是不是文字 = 是文字
console.log(isNaN(c));
```
