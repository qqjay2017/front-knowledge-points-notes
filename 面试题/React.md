### 第 1 题.写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

```
key是React用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识
在开发过程中，我们需要保证某个元素的key在其同级元素中具有唯一性
在React Diff算法中React会借助元素的key值来判断该元素是新创建的还是被移动而来的元素，从而减少不必要的元素重新渲染
此外，React还需要借助Key值来判断元素与状态的关联关系
key尽量不要使用数组下标和动态值或者不稳定的值作为key
```

<br/>

### 第 2 题：React 中 setState 什么时候是同步的，什么时候是异步的？原理是什么？

- 如果是在事件系统和钩子函数内,是异步的,因为react会合成事件,事件将委托给document进行统一处理,这时候的setState将会push进执行栈,然后合并批量更新

- 原生事件和setTimeout中是同步的,在原生事件和setTimeout中不会批量更新

<br/>


### 第 3 题：React setState 笔试题，下面的代码输出什么？

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log 0 

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log 0

    setTimeout(() => {
      console.log(this.state.val);  // 第 3 次 log 2

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log 3
    }, 0);
  }

  render() {
    return null;
  }
};
```


<br/>






### 第 4 题：聊聊 Redux 和 Vuex 的设计思想

* 共同思想
 - 单一的数据源
 - 变化可以预测
 - 本质上:Redux和Vuex都是对MVVM思想的服务，将数据从视图中抽离的一种方案
 - 形式上:Vuex借鉴了Redux，将store作为全局的数据中心，进行数据管理


* Redux和Vuex区别 

 - Vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值就可以


 ```
 通俗理解就是:Vuex弱化dispatch，通过commit进行store状态的一次变更；取消了action概念，不必传入特定的action形式进行指定变更；弱化reducer，基于commit参数直接对数据进行转变，使得框架更加建议
 ```




<br/>

### 第 5 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别


从最终渲染的DOM来看，这两者都是链接，都是a标签，

 Link标签是react-router里实现路由跳转的链接，一般配合Route使用，
 react-router禁止了其默认的链接跳转行为，区别于传统的页面跳转，
 Link标签的"跳转"行为只会触发相匹配的Route对应的页面内容更新，而不会刷新整个页面


 - Link标签做的三件事情：

1.有onclick那就执行onclick
2.click的时候阻止a标签默认事件
3.根据跳转href(即使是to)，用history(web前端路由两种方式之一，history&hash)跳转，
此时只是链接变了，并没有刷新页面

 - 而标签就是普通的超链接了，用于从当前页面跳转到href指向的里一个页面(非锚点情况)

> 如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。

`location.href=this.href`


<br/>



### 第 6 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？



<br/>

### 第 6 题：redux 为什么要把 reducer 设计成纯函数

因为state是只读的,唯一改变 state 的方法就是触发action
action是一个普通对象,

reducer的职责不允许有副作用，副作用简单来说就是不确定性，如果reducer有副作用，那么返回的state就不确定，

所以使用纯函数来执行修改

<br/>


### 第 7 题：实现一个 Dialog 类，Dialog可以创建 dialog 对话框，对话框支持可拖拽（腾讯）


<br/>

### 第 8 题：如何实现骨架屏，说说你的思路


<br/>


### 第 9 题：虚拟DOM优缺点

<br/>


###  第 10 题：Class组件的生命周期

<br/>


###  第 11 题：你是如何理解fiber的?

<br/>


###  第 12 题：React合成事件？

<br/>


### 第 13题：Redux的设计理念？你是如何理解单向数据流的？

<br/>


### 第 14题：Vue和React的区别你怎么看待？



<br/>

### 第 15题： React设计理念？



<br/>


### 第 16题： React如何进行组件/逻辑复用?，高阶组件是什么？



<br/>


### 第 17题： 聊一聊React项目性能优化


<br/>


### 第 18题： React中获取ref的几种方法


<br/>


### 第 19题： React中组件父子组件通信的方式？非父子组件之间通信呢？


<br/>



### 第 20 题： React.memo的作用是什么？


<br/>

### 第 21 题： ReactDOM.createPortal的作用和引用场景


<br/>


### 第 22 题：React.Fragment有什么作用


<br/>


### 第 23 题：React中插入html字符串?


<br/>


### 第 24 题：mixin、hoc、render props、react-hooks的优劣如何？


<br/>

### 第 25 题：你对 Time Slice的理解?


<br/>


### 第 26 题：redux的工作流程? react-redux是如何工作的? redux中如何进行异步操作?

<br/>

### 第 27 题：redux异步中间件之间的优劣?


<br/>

### 第 28 题：react里做的优化有哪些？
### 第 29 题：react的domdiff原理说一下？

```
说一下Vue和React的认识，做一个简单的对比。
React的Dom的diff算法描述一下。
浏览器cookie和session的认识。
跨域分哪几种类型，如何解决各个跨域的问题。
nodejs的setTimeOut不准时的原因分析。

```