> https://reactrouter.com/web/api/HashRouter

## 1.Router   路由容器,里面包含路由规则

- <BrowserRouter>
- <HashRouter>
- getUserConfirmation 当组件里面有Prompt时候会触发,控制路由离开时候的行为,默认是window.confirm

默认行为
```js
 getUserConfirmation={(message, callback) => {
        const allowTransition = window.confirm(message);
          callback(allowTransition);
      }}
```


自定义行为,callback控制是否跳转

```js
getUserConfirmation={(message, callback) => {
        console.log(message)
        callback(true)
      }}
```


## 2.Route  路由规则

 - path  
 - exact
 - strict: bool  后面跟不跟/
 - component 路径匹配的组件
 - render    控制路径匹配时候,返回的组件,可以添加逻辑
 - children  无论路径匹不匹配,都会调用,优先度高,可能会和Switch冲突

## 3.Link   导航,返回a标签
- NavLink  匹配时候   ,exact

## 4. <Switch>   只匹配第一个<Route>或者 <Redirect>
 - 性能优化,匹配到了就不往下走了
 - 先取出Switch所有的儿子们
 - 用当前路径和儿子们的path一一匹配,一个匹配到了,后面就不匹配了

## 5. withRouter 
- 高阶组件,向类组件Provider  RouterContext
- 类组件获取到history,location,match对象
 

 ## 6.Prompt
 - 一般用在表单组件
 - 路由跳转时候触发,调用Router的getUserConfirmation属性里面指定的行为
 - when   true  / false  ,守卫是否生效
 - message  传递给getUserConfirmation

## 7.hooks

-  useParams();
- useLocation();
- useHistory();

## 8.路由懒加载

1. 异步引入组件
`const Login = React.lazy(()=>import(/* webpackChunkName: "Login" */ './components/Login'))`

2. 异步组件套上Suspense,组件在加载过程中将会执行<Loading />
```jsx
<Suspense  fallback={<Loading />}>
      <Login />
  </Suspense>
```