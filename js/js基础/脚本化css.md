#### 脚本化css
dom.style.prop

写进和读取的是行内样式，style标签里面写的无法读取

复合属性必须（建议）拆解

命名小驼峰形式 

##### 除了.style方法可以写入值，没有方法可以写入值

### 查询计算样式

`window.getComputedStyle(div,null)`
`window.getComputedStyle(div,"after")`
获取div样式表，当前所展示的css的一切显示值，不管是行间的还是style里面的,以显示出来的为准,只能读取,不能更改..返回的值都是绝对值,没有相对值,ie8及ie8以下不兼容..第二个属性是伪元素

#### 封装兼容性方法getStyle

`dom.currentStyle.prop`
ie自己的获取css方法

```js
function getStyle(elem,prop) {
    if(window.getComputedStyle){
        //chrome的
        return window.getComputedStyle(elem,null)[prop];
    }else {
        //ie的
        return elem.currentStyle[prop];
    }
}
```


