# hooks总结

## hooks 动机

```
React 开发人员面临的最大问题之一是
如何重用组件之间的状态逻辑。当我们拥有共享相似状态逻辑的组件时，如果没有好的重用解决方案，
那么有时就会导致构造函数和生命周期方法中的逻辑重复。
```

传统上处理这种情况的典型方法如下所示：
 - 使用高阶组件；
 - 渲染复杂的属性。


 ```
 Hook 旨在解决所有这些问题，它使你能够编写可以访问诸如状态、上下文、生命周期方法、引
用等特性的函数式组件，而不需要编写类组件。
```


## 1.useState
 - 定义状态然后获得状态和改变状态的函数
 - 变更状态逻辑比较简单
## 2.useReducer
 - useState只是useReducer的语法糖或者说简单使用
 - 当你变更状态的逻辑比较复杂的时候,使用useReducer
## 3.useCallback
 - 都有依赖项
 - 如果依赖项数组变化了就重新得到新的数组,如果没变就用老的函数
## 4.useMemo
 - 都有依赖项
 - 如果依赖项数组变了就重新得到新的对象,如果没变就用老对象
 和 React.memo() 配合,因为经过memo处理的组件,当属性变了会重新渲染,如果没变化不重新渲染
 - 缓存对象,减少计算量
## 5.useContext
 从上下文中获取value  Provider._currentValue
## 6.useEffect和useLayoutEffct
 - 都是处理副作用
 - 都是组件渲染之后执行
 - useEffect是宏任务,渲染之后
 - useLayoutEffct是微任务,渲染之前执行
## 7.useRef
 - 类似于React.createRef()
 - current的值是可以改的,按时ref对象保持不变
## 8.forwardRef
 - 如果想给函数组件添加ref的话,就必须让函数组件传给forwardRef来包裹下
 - 使用useImperativeHandle,可以在组件内部自定义暴露给外部的ref对象,vaoihu内部的dom元素不被任意修改


#### 社区对 Hook 的反应

[usehooks](https://usehooks.com/)