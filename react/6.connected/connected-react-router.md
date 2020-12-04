# connected-react-router

绑定react-router到redux 

> https://www.npmjs.com/package/connected-react-router

## 安装
`$ npm install --save redux react-redux   react-router-dom connected-react-router `

## FAQ 

> https://github.com/supasate/connected-react-router/blob/master/FAQ.md#how-to-navigate-with-redux-action

## 坑

#### history必须是@4

No, just lib history update v5.0.0, i decrease verion 4.10.1, it's work ok

> https://github.com/supasate/connected-react-router/issues/312

## 流程

> 利用history.listen改变state,利用dispatch调用history方法,将router和redux并联

#### routerMiddleware

CALL_HISTORY_METHOD自动调用history方法

#### action

```
路由变化 LOCATION_CHANGE

调用history方法 CALL_HISTORY_METHOD
```

#### reduce

```
LOCATION_CHANGE 之后返回新的    state
```

#### ConnectedRouter

```
监听路由变化,调用LOCATION_CHANGE
```