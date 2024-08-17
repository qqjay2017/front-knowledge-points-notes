
### 1.`['1', '2', '3'].map(parseInt)` what & why ?


<br/>




### 2.什么是防抖和节流？有什么区别？如何实现？


<br/>



### 3.介绍下 Set、Map、WeakSet 和 WeakMap 的区别？



<br/>



### 4.介绍下深度优先遍历和广度优先遍历，如何实现？



<br/>


### 5.请分别用深度优先思想和广度优先思想实现一个拷贝函数？



<br/>


### 6.ES5/ES6 的继承除了写法以外还有什么区别？


<br/>


### 7.setTimeout、Promise、Async/Await 的区别


<br/>



### 8.Async/Await 如何通过同步的方式实现异步



<br/>



### 9.异步笔试题

> 请写出下面代码的运行结果

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

公司：头条

<br/>


### 10.算法手写题

> 已知如下数组：
>
> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

公司：携程


<br/>



### 11.JS 异步解决方案的发展历程以及优缺点。

公司：滴滴、挖财、微医、海康



<br/>


### 第 12：Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

公司：微医

<br/>


### 第 13：情人节福利题，如何实现一个 new

公司：兑吧



<br/>



### 第 14 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray() 


<br/>


### 第 15 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。


<br/>

### 第 16 题：两个数组合并成一个数组

请把两个数组 `['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']`。



<br/>




### 第 17 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```



<br/>




### 第 18 题：下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```


<br/>



### 第 19 题：简单改造下面的代码，使之分别打印 10 和 20。

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```


<br/>



### 第 20 题：使用迭代的方式实现 flatten 函数。


<br/>


### 第 21题：下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

公司：京东

<br/>



### 第 22 题：下面代码输出什么

```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```



<br/>



### 第 23 题：实现一个 sleep 函数

比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现



<br/>



### 第 24 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果



<br/>


### 第 25 题：输出以下代码执行的结果并解释为什么

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```


<br/>


### 第 26 题：call 和 apply 的区别是什么，哪个性能更好一些



<br/>


### 第 27 题：实现 (5).add(3).minus(2) 功能。

> 例： 5 + 3 - 2，结果为 6


公司：百度

<br/>


### 第 28 题：输出以下代码的执行结果并解释为什么

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```


<br/>



### 第 29 题：某公司 1 到 12 月份的销售额存在一个对象里面

> 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

<br/>


### 第 30 题：要求设计 LazyMan 类，实现以下功能。 

```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```


<br/>

### 第 31 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？



<br/>

### 第 32 题：模拟实现一个 Promise.finally



<br/>


### 第 33 题： `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？



<br/>


### 第 34 题：ES6 代码转成 ES5 代码的实现思路是什么



<br/>


### 第 35 题：数组编程题

> 随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。

<br/>


### 第 36 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。


<br/>



### 第 37 题： 为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。



<br/>



### 第 38 题： 使用 JavaScript Proxy 实现简单的数据绑定


<br/>


### 第 39 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少



<br/>


### 第 40 题：输出以下代码运行结果

```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
```


<br/>


### 第 41 题：算法题「旋转数组」

> 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1：

```js
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
```

示例 2：

```js
输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释: 
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100]
```


<br/>

### 第 42 题：input 搜索如何防抖，如何处理中文输入



<br/>

### 第 43 题：介绍下 Promise.all 使用、原理实现及错误处理


<br/>

### 第 46 题：var、let 和 const 区别的实现原理是什么



<br/>



### 第 47 题：请实现一个 add 函数，满足以下功能。

> ```js
> add(1); 			// 1
> add(1)(2);  	// 3
> add(1)(2)(3)；// 6
> add(1)(2, 3); // 6
> add(1, 2)(3); // 6
> add(1, 2, 3); // 6
> ```

<br/>




### 第 48 题：在输入框中如何判断输入的是一个正确的网址。

<br/>

### 第 49 题：设计并实现 Promise.race()

解析：[第 89 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/140)

<br/>



### 第 50 题：如何实现模糊搜索结果的关键词高亮显示



<br/>


### 第 51 题：模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况


<br/>

### 第 51 题：写出如下代码的打印结果

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

公司：京东



<br/>

### 第 52题：请写出如下代码的打印结果

> ```js
> function Foo() {
> Foo.a = function() {
>   console.log(1)
> }
> this.a = function() {
>   console.log(2)
> }
> }
> Foo.prototype.a = function() {
> console.log(3)
> }
> Foo.a = function() {
> console.log(4)
> }
> Foo.a();
> let obj = new Foo();
> obj.a();
> Foo.a();
> ```



公司：京东


<br/>



### 第 53 题：模拟实现一个 localStorage

公司：阿里


<br/>



### 第 54 题：模拟 localStorage 时如何实现过期时间功能

公司：阿里


<br/>

### 第 55 题：编程题

> url有三种情况
>
> ```js
> https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
> https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
> https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33
> ```
>
> 匹配elective后的数字输出（写出你认为的最优解法）:
>
> ```js
> [] || ['800'] || ['800','700']
> ```


<br/>


### 第 56 题：分别写出如下代码的返回值

> ```js
> String('11') == new String('11');
> String('11') === new String('11');
> ```



公司：京东


<br/>

### 第 57 题：请写出如下代码的打印结果

> ```js
> var name = 'Tom';
> (function() {
>  if (typeof name == 'undefined') {
>      var name = 'Jack';
>      console.log('Goodbye ' + name);
>  } else {
>      console.log('Hello ' + name);
>  }
> })();
> ```



公司：京东


<br/>


### 第 58 题：扩展题，请写出如下代码的打印结果

> ```js
> var name = 'Tom';
> (function() {
>  if (typeof name == 'undefined') {
>      name = 'Jack';
>      console.log('Goodbye ' + name);
>  } else {
>      console.log('Hello ' + name);
>  }
> })();
> ```



公司：京东



<br/>


### 第 59 题：编程题，请写一个函数，完成以下功能

> 输入
> ``'1, 2, 3, 5, 7, 8, 10'``
> 输出
> ``'1~3, 5, 7~8, 10'``



<br/>



### 第 60 题：编程题，写个程序把 entry 转换成如下对象

> ```js
> var entry = {
> a: {
> b: {
>   c: {
>     dd: 'abcdd'
>   }
> },
> d: {
>   xx: 'adxx'
> },
> e: 'ae'
> }
> }
> 
> // 要求转换成如下对象
> var output = {
> 'a.b.c.dd': 'abcdd',
> 'a.d.xx': 'adxx',
> 'a.e': 'ae'
> }
> ```


<br/>



### 第 61 题：编程题，写个程序把 entry 转换成如下对象（跟昨日题目相反）

> ```js
> var entry = {
> 'a.b.c.dd': 'abcdd',
> 'a.d.xx': 'adxx',
> 'a.e': 'ae'
> }
> 
> // 要求转换成如下对象
> var output = {
> a: {
> b: {
>   c: {
>     dd: 'abcdd'
>   }
> },
> d: {
>   xx: 'adxx'
> },
> e: 'ae'
> }
> }
> ```

<br/>



### 第 62 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）

> 1. 如传入的数组元素为`[123, "meili", "123", "mogu", 123]`，则输出：`[123, "meili", "123", "mogu"]`
> 2. 如传入的数组元素为`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`，则输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`
> 3. 如传入的数组元素为`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`，则输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`


<br/>



### 第 63 题：编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）

> ```js
> 'abcaakjbb' => {'a':2,'b':2}
> 'abbkejsbcccwqaa' => {'c':3}
> ```



<br/>

### 第 64 题：输出以下代码运行结果

> ```js
> 1 + "1"
> 
> 2 * "2"
> 
> [1, 2] + [2, 1]
> 
> "a" + + "b"
> ```



<br/>


### 第 65 题：输出以下代码执行结果

> ```js
> function wait() {
> return new Promise(resolve =>
>  setTimeout(resolve, 10 * 1000)
> )
> }
> 
> async function main() {
> console.time();
> const x = wait();
> const y = wait();
> const z = wait();
> await x;
> await y;
> await z;
> console.timeEnd();
> }
> main();
> ```


<br/>



### 第 66 题：输出以下代码执行结果，大致时间就好（不同于上题）

> ```js
> function wait() {
> return new Promise(resolve =>
>  setTimeout(resolve, 10 * 1000)
> )
> }
> 
> async function main() {
> console.time();
> await wait();
> await wait();
> await wait();
> console.timeEnd();
> }
> main();
> ```


<br/>


### 第 67 题：用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异


<br/>


### 第 68 题：求两个日期中间的有效日期

> 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】

<br/>


### 第 70 题：将 '10000000000' 形式的字符串，以每 3 位进行分隔展示 '10.000.000.000'

<br/>


### 第 71 题：手写二进制转 Base64（阿里）

<br/>


### 第 72 题：用最简洁代码实现 indexOf 方法

<br/>


### 第 72 题：谈谈作用域和闭包

<br/>

### 第 73 题：为什么使用var可以重复声明？，变量声明提升？

<br/>



<br/>


### 第 75 题：暂时性死区？

<br/>

### 第 76题：
> try...catch的作用域？


<br/>

### 第 77题：JavaScript模块化？浏览器中异步模块是如何实现的？循环依赖如何处理？


<br/>

### 第 78题：常见DOM API

<br/>


### 第 79题：call()和apply()的区别和作用？

<br/>



### 第 80 题：创建ajax的过程？

<br/>


### 第 81 题： $(document).ready() 方法和window.onload 有什么区别？

<br/>



### 第 82 题：如何理解 JS 中的this关键字？



<br/>


#### 第 83 题： 构造函数调用时发生了什么



<br/>

#### 第 83 题： 函数中的arguments是数组吗？如何使用数组的方法


<br/>


### 第 84 题： 如何编写代码实现构造函数不用new关键字会报错

<br/>




### 第 85 题：实现flattenDeep，将数组展平 

<br/>




### 第 86 题：实现compose函数

<br/>


### 第 87 题：实现函数柯里化，反柯里化

<br/>


### 第 88 题：使用promise.all进行5个请求，若其中1个返回失败，怎么让其他4个可以成功返回

<br/>


