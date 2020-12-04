### 第 1 题.写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？


<br/>

### 第 2 题：React 中 setState 什么时候是同步的，什么时候是异步的？原理是什么？

公司：微医



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
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```


<br/>






### 第 4 题：聊聊 Redux 和 Vuex 的设计思想


<br/>

### 第 5 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

> 如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。


<br/>



### 第 6 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？



<br/>

### 第 6 题：redux 为什么要把 reducer 设计成纯函数



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