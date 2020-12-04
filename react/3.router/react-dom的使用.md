## 安装

`npm i react-router-dom`

`react-router-dom` 包含三个包


```
react-router            route核心,所有平台共用
history                 所有平台的history
react-router-dom        react-router的浏览器支持
```

## 概念

`BrowserRouter as Router`  : 路由容器,只有一个
`Route`                    : 路由规则,有好多个

## 函数组件的使用方法

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Home from './components/Home'
import Category from './components/Category'
import Profile from './components/Profile'

function App (){
    return <Router>
      <Route path="/" exact  component={Home} />
      <Route path="/category"  component={Category} />
      <Route path="/profile"  component={Profile} />
    </Router>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```