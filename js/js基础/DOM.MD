### DOM

dom产生的对象，基本上都是类数组

##DOM基本操作

增删改查

#### 查看元素节点

实时的
`document.getElementById();`
`document.getElementByTagName()`
`......`

非实时的
`var div = document.querySelector();`
 识别的是css。选出来的是单个。选出来的是一个副本。静态

 `document.querySelectorAll ();`
 > 但是并不用。因为选出来 的元素不是实时的。


 #### 基于节点树的遍历

 `strong.parentNode`strong的父级节点

`childNodes`子节点们
`firstChild`第一个子节点
`lsatChild`最后一个子节点

`nextSibling` 下一个兄弟节点
`previousSibling`前一个兄弟节点

#### 基于元素节点树的遍历

`parentElement`返回当前元素的父级元素节点（ie不兼容）
`children`只返回当前元素的父元素子节点（ie不兼容）
`node.childElementCount`==`node.children.length`当前元素节点的子节点的个数
`firstElementChild`返回的是第一个元素子节点（ie不兼容）
`nextElementSibling`上一个兄弟元素节点
`previousElementSibling`下一个兄弟元素节点




#### 节点的类型

 - 元素节点--1
 - 属性节点--2
 - 文本节点--3
 - 注释节点--8
 - document--9
 - Documentfragment--11

 #### 节点的四个属性

nodeName
  - 元素的标签名，以大写形式表示，只读

nodeValue
   - text节点或者comment节点的文本内容，可读写

nodeType
 - 该节点的类型对应的数字，只读.最有用，可以帮我们分辨出来节点的类型。
 
attributes
 - Element节点的属性集合
 `div.attributes`
 `getAttributes`....

 节点的一个办法
 Node.hasChildNodes();--true/false...

 继承关系
 document-->HTMLDocument.prototype-->Document.prototype


 ##### 三个特殊的根元素

 `document.body`
 `document.head`
 `document.documentElement`代表html

没有document.html

#### 对元素节点进行操作

增
 `document.createElement();`
 `document.createTextNode();`文本
 `document.createComment();`注释
 `document.createDocumentFragment();`

插入
`appendChild();`
`insertBefore(a,b)`insert a before b

删
`removeChild()`
`remove`

Element节点的一些属性
`innerHTML`常用

`innerText`(火狐不兼容)
`textContent`(老ie不兼容)

Element节点的一些方法

`ele.setAttribute('id','only');`
`ele.getAttribute('id');`

#### 查看滚动条的滚动距离
`window.pageXOffset/pageYOffset;` ie8及ie8以下不兼容

`document.body.scrollLeft/scrollTop`
`document.documentElement.scrollLeft/scrollTop`
兼容性比较混乱，用时用两个值相加，因为当一个有值，另一个为0；

 #####  封装兼容性方法，求滚动条距离getScrollOffset();

 ```js
 function getScrollOffset() {
            if (window.pageXOffset) {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                }
            } else {
                return {
                    x: document.body.scrollLeft + document.documentElement.scrollLeft,
                    y: document.body.scrollTop + ducoment.documentElement.scrollTop
                }
            }
        }
```

查看可视区尺寸
`window.innerWidth`标准方法，ie8及ie8以下不兼容
`document.docuemntElement.clientWidth/clientHeight`标准模式下，任何浏览器都兼容

`document.body.clientWidth/clientHeight`适用于怪异模式下的浏览器

`document.compatMode`
BackComp at --向后兼容，怪异模式
CSS1Compat --正常模式

 - 封装兼容性方法，返回浏览器视口尺寸getViewportOffset()

```js
function getViewportOffset (){
    if(window.innerWidth){
        return {
            w:window.innerWidth,
            head:window.innerHeight
        }
    }else {
        if(document.compatMode === "BackCompat"){
            return {
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else {
            return {
                w: document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}
```

 ##### 查看元素尺寸
 `domEle. getBoundingClientRect();`兼容性很好，返回一个对象，对象里面有left，top，right，bottom等属性。left和top代表左上角的x和y坐标
 right和bottm代表元素右下角的x和y坐标
 返回的结果并不是实时的。
 
 `dom.offsetWidth`
 `dom.offsetHeight`查看元素尺寸

 `dom.offsetLeft`
 `dom.offsetTop`查看元素位置（查看离自身最近的有定位的父级的距离）

让滚动条滚动

window上有三个方法

scroll(),scrollTo(),scrollBy();
三个方法类似，都是将x，y坐标传入，即实现让滚动条滚动到当前位置。
区别：scrollBy();会在之前数据基础上做累加。（从上一次的基础开始：自动滚动）

 自动阅读 案例
```js
var start = document.getElementsByClassName('start')[0];
        var end = document.getElementsByClassName('end')[0];
        var flag = true;
        var num = 10;
        var timer = null;
        start.onclick = function () {
            if (flag) {
                timer = setInterval(() => {
                    window.scrollBy(0, num);
                }, 100);
                flag = false;
            }
        }
        end.onclick = function () {
            clearInterval(timer);
            flag = true;
        }
```

