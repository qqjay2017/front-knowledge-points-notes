## css笔记
### 1.权重

		!important----Infinity
		行间样式-------1000
		id------------100
		class|属性|伪类----10
		标签样式|伪元素----1
		通配符------------0
		256进制

### 2.表单

    <form action="" method="get">
    <input type="text" name="" value="111">
    <input type="submit">
    </form>

### 3.选择器
 - 标签选择 
 - id选择器
 - class选择器
 - 后代选择 （div a）
 - 子代选择 （div > p）
 - 相邻选择 （div + p）
 - 通配符选择 （*）
 - 否定选择器 :not(.link){}
 - 属性选择器
 - 伪类选择器
 - 伪元素选择器 ::before{}

### 4.伪类选择器

		div:hover {}
	
* 伪类和伪元素区别
 * 伪类值一种状态 比如:hover
 * 伪元素是一个真实存在的元素，他可以有样式有内容

### iconfont原理
 - 利用编码让图标编为一个字符
 - 引入字体
 - 利用before伪元素向页面中插入一个文字


### 5.display


- 块级元素 --- block

		独占一行，可以通过css改变宽高
		常见的有div,p,ul,li,ol,form,address

- 行级元素 --- inline

		内容决定元素所占位置，不可以通过css改变宽高
		见的有span,strong,em,a,del


- 行内块元素 --- inline-block

		独占一行，可以通过css改变宽高
		一旦设置1.position:absolute;和
		2.display:block，元素在内部就会被转化成inline-block


#### 凡是带有inline的，都有文本的特性，文本类元素
#### 行内元素内有文字的，外面的文字会和里面的文字的底对齐

### 6.img间隙

		img是行内元素，凡是带有inline的元素，都带有文字特性，就会被分割，

### 7.盒子模型

7.1盒子的三大部分 

* 外边距&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin
* 盒子壁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;border
* 内边距&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding.。。背景颜色图片可以加在padding上
* 盒子内容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content
* 一个值：四边，两个值：左右+上下；三个值：上+左右+下，因为左右等距的情况比较多
#### CSS如何设置这两种盒模型？

标准盒模型：
``` 
box-sizing: content-box;
```
怪异盒模型：
```
box-sizing: border-box;
```
> 标准模型的宽高是指的content区宽高；
> IE盒模型的宽高是指的content+padding+border的宽高。
### 8.定位
```css
position：static | relative | absolute | fixed | center | page | sticky
```

默认值：static

relative：

	绝对定位；占位置；；；保留原来位置进行定位；；
	### 相对于自己原来的位置进行定位
	对象遵循常规流，并且参照自身在常规流中的位置通过top，right，bottom，left属性进行偏移时不影响常规流中的任何元素。

absolute：

	相对定位；；；不占位置；脱离原来位置进行定位；
	### 相对于最近的父级进行定位，如果都没有就和文档定位
	对象脱离常规流，使用top，right，bottom，left等属性进行绝对定位，盒子的偏移位置不影响常规流中的任何元素，其margin不与其他任何margin折叠。

fixed：
对象脱离常规流，使用top，right，bottom，left等属性以窗口为参考点进行定位，当出现滚动条时，对象不会随着滚动。

### 子绝父相



### 8.居中

```css
position:absolute;
left:50%;
margin-left:-物体宽度px;
margin: 0 auto;
vertical-align:middle;
<!--文本对齐方式-->
```


### 9.层级
z-index:

### 9.伪元素
```css
::before
::after
```
- 必须带有content:""属性，否则不生效
- content:""只能用于伪元素

### 10.如何生成bfc---(脱离文档流)
* 消除bfc的4种方法
> 1.position:absolute|fixed;
> 2.display:inline-block|table-cell|table-caption
> 3.float:left/right;
> 4.overflow:hidden;


### 11.nav注意事项------三件套

> 使用伪元素清楚浮动

```css
.container::after {
  content: " ";
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
}
```


### 12.文字溢出，打点展示

* 单行------三件套

	```css
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: no-wrap;
	```
	12.2多行文本
	```css
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	```

### 13.background
	CSS 属性定义背景效果:

	background-color

	background-image

	background-repeat   :no-repeat

	background-attachment

	background-position  :100px  100px; |left center;   显示位置 定位

### 14.logo图片代替文字

* 结构

	div>h1>a>文字

		<a href="http://www.taobao.com">淘宝网</a>

		a {
			text-indent: 190px;
			white-space: nowrap;
			overflow: hidden;
			background:   ;
			
		}

		在网速好的情况下，加载css，文字溢出被隐藏。。
		网速不好的情况下，只显示html，就把中文显示出来了

		方法2，全部都paddingtop，文字放下面去
		a:
		display: inline-block;   //这个一定要写，不然可能显示不全
		padding-top:120px;
		background:   ;
		overflow: hidden;
		width:  ;


### 15.特殊点

		1.行级元素只能嵌套行级元素
		块级元素可以嵌套任何元素
		2.a标签中不能嵌套a标签

### 16怎样美化一个checkbox ?
 - 让原本的勾选框隐藏
 - `input + label` 背景图没选中
 - `input:checked + label` 背景图选中
```css
.checkbox input{
  display: none;
}
.checkbox input + label{
  background:url(./没选中.png) left center no-repeat;
  background-size:20px 20px;
  padding-left:20px;
}
.checkbox input:checked + label{
  background-image:url(./选中.png);
}
```

```html
<div class="checkbox">
  <input type="checkbox" id="handsome"/>
  <label for="handsome">我很帅</label>
</div>
```

### 滚动
 - visible 滚动条隐藏, 文字超出显示
 - hidden  滚动条隐藏, 文字超出不显示
 - scroll  滚动条一直显示，无论文字是否够多
 - auto    滚动条自动隐藏



### 文字折行
 - overflow-wrap(word-wrap)通用换行控制
   - 是否保留单词
 - word-break 针对多字节文本文字
   - 中文句子也是单词
 - white-space 空白处是否换行



### display: none; 与 visibility: hidden; 的区别

相同： 它们都能让元素不可见

区别：

- display:none;会让元素完全**从渲染树中消失**，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染时元素继续占据空间，只是内容不可见
- display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility:hidden;是继承属性，子孙节点消失由于继承了 hidden，通过设置 **visibility: visible;可以让子孙节点显式**
- 修改常规流中元素的 display 通常会造成文档**重排**。修改 visibility 属性只会造成本元素的重绘
- 读屏器不会读取 display: none;元素内容；会读取 visibility: hidden 元素内容



3.参考网站

1.[css88](https://www.html.cn/)



		

