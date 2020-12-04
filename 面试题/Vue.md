
### 第 1 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的


```
> create-component 
> transformModel

value + input方法的语法糖

给原生dom绑定v-model:会根据你的dom绑定事件

> platforms/web/compiler/directives/model.js

```



<br/>


### 第 2 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。



<br/>



### 第 3 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？


<br/>



### 第 4 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop

如果修改了，Vue 是如何监控到属性的修改并给出警告的。



<br/>

### 第 5 题：双向绑定和 vuex 是否冲突



<br/>

### 第 7 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？


<br/>




### 第 8 题：如何设计实现无缝轮播



<br/>

### 第 9 题：Vue 的父组件和子组件生命周期钩子执行顺序是什么

加载渲染过程

 - 父beforeCreate -> 父Created -> 父beforeMount  -> 子beforeCreate ->  子beforeMount -> 子mounted ->父mounted

   - 父beforeMount 要渲染父节点的时候会调用render, 发现有子节点,就走子节点的全套,

子组件更新过程
 - 父beforeUpdate -> 子beforeUpdate ->  子updated  -> 父子updated

父组件更新过程
 - 父beforeUpdate -> 父 updated

销毁过程
- 父beforeUpdate  -> 父updated

理解

- 组件的调用顺序都是先父后子,渲染完成的顺序肯定是先子后父
- 组件的销毁操作是先父后子,销毁完成的顺序是先子后父
- 

<br/>


### 第 10 题：vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？


<br/>


### 第 11 题：vue 渲染大量数据时应该怎么优化？




<br/>

### 第 12题：vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？

### vue常见性能优化


#### 编码优化

 - 不要将所有数据都放data里面,data里面的数据都会增加getter和setter,会收集对应的watch.
 - vue在v-for时给每项元素绑定事件都需要用事件代理
 - spa用keep-alive缓存组件
 - 拆分组件,提高复用性,增加代码的可维护性,减少不必要的渲染
 - v-if具有阻断功能,内部的指令不会执行
 - key保证唯一性,默认vue会采用就地复用策略
 - Object.freeze冻结数据
 - 合理使用懒加载,异步组件
 - 数据持久化问题(防抖节流)

#### 加载性能

- 第三方模块按需导入        babel-plugin-component   
- 滚动的可视区域动态加载    vue-virtual-scroll-list
- 图片懒加载                vue-lazyload

#### 用户体验
- app-skeleton 骨架屏
- app-shell  骨架屏
- pwa

#### seo优化
- 预渲染插件 prerender-spa-plugin
- 服务端渲染  ssr

#### 打包优化
- cdn的方式加载第三方模块
- 多线程打包happypack

<br/>


### 第 13 题：vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法



<br/>



###  第 14 题：谈一谈 nextTick 的原理


<br/>

### 第 15 题：Vue 中的 computed 和 watch 的区别在哪里（虾皮）

<br/>



### 第 16 题：v-if、v-show、v-html 的原理是什么，它是如何封装的？

<br/>


### 第 17 题： 谈谈你对MVC、MVP、MVVM？

<br/>



### 第 18题：fetch熟悉吗？axios拦截器如何实现的？axios如何取消请求？

<br/>



### 第 19题：new Vue(options)中发生了什么操作

<br/>


### 第 20 题：如果让你用proxy实现Vue的响应式系统，你会如何处理


<br/>

### 第 21 题： Vue 组件 data 为什么必须是函数


<br/>

### 第 22 题： React和Vue有什么区别


<br/>



### 第 23 题：  Vue生命周期的原理是什么



<br/>

### 第 24 题： 为什么要求组件模板只能有一个根元素



<br/>



### 第 25 题：为什么Vue中可以通过this访问到和修改this.$data的值



<br/>

### 第 26 题：在使用计算属性的时，函数名和data数据源中的数据可以同名吗



<br/>


### 第 26 题：keep-alive的实现原理和相关的生命周期


keep可以实现组件的缓存,当组件切换时不会对当前组件进行卸载
常用的两个属性  include/exclude
2个生命周期,activated  deactivated


LRU算法


<br/>



### 第 27 题：Vue中diff算法key的作用



<br/>



### 第 28 题： vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？



<br/>


### 第 28 题：  说下$attrs和$listeners的使用场景




<br/>

### 第 29 题： Vue组件之间的通信


<br/>




### 第 30 题： 简述v-model的实现原理


<br/>


### 第 31 题： css scoped是如何在Vue中实现的


<br/>


### 第 32 题： nextTick为什么优先采用微任务


<br/>

### 第 33 题：complier 实现


<br/>

### 第 34 题：插槽与作用域插槽的区别

渲染的作用域不同

普通插槽是在父组件渲染,

作用域插槽是在子组件渲染


<br/>
