import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import Home from "./components/Home";
import Category from "./components/Category";
import Profile from "./components/Profile";
import Post from "./components/Post";

import Protected from "./components/Protected";

import HeaderTitle from "./components/HeaderTitle";
// import Login from "./components/Login";

const Login = React.lazy(()=>import(/* webpackChunkName: "Login" */ './components/Login'))

function Loading() {
  return <div>加载中......</div>
}

function SuspenseLogin(){

  return (<Suspense  fallback={<Loading />}>
      <Login />
  </Suspense>)
}

function App() {

  return (
    <Router
      getUserConfirmation={(message, callback) => {
        console.log(message)
        callback(true)
      }}
    >
      <div>
        <HeaderTitle title="welcome" />
        <ul>
          <li>
            <NavLink to="/" exact activeStyle={{ color: "red" }}>
              首页
            </NavLink>
          </li>
          <li>
            <NavLink to="/category" activeStyle={{ color: "red" }}>
              category
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeStyle={{ color: "red" }}>
              profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/post/998" activeStyle={{ color: "red" }}>
              998
            </NavLink>
          </li>
        </ul>
        <Switch>
          {/* // children  属性为,不管路径匹不匹配,都会渲染!
            // 但是和Switch冲突
          */}

          <Route path="/" exact component={Home} />
          <Route path="/category" component={Category} />
          <Protected path="/profile" component={Profile} />
          <Route path="/post/:id" component={Post} />
          <Route path="/login" component={SuspenseLogin} />
          <Route
            children={(routeProps) => {
              console.log(routeProps);
              return <div>childrenchildrenchildren</div>;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
