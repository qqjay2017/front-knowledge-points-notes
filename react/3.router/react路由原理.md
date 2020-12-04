# React路由原理

- 不同的路径渲染不同的组件
- 有两种实现方式
    - HashRouter:利用hash实现路由切换
    - BrowserRouter:实现h5 Api实现路由的切换


hashchange事件

```js
 window.addEventListener('hashchange',()=>{
            let hash = window.location.hash;
            hash = hash.slice(1)
            root.innerHTML = hash;
        })
```

Brower路由

> https://developer.mozilla.org/zh-CN/docs/Web/API/History

```js
window.history.pushState({value:'aaa'},'标题a','/a')
```