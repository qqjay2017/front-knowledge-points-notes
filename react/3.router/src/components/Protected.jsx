
import React from "react";
import { Redirect, Route } from "react-router-dom";

/**
 * .实现受保护路由,相当于vue的路由过滤
 * @param {*} props 
 */

export default function Protected(props) {
  const { path, component: RouteComponent } = props;
  function render(routeProps) {
    // 判断是否登录
    const hasLogin = localStorage.getItem("login");
    if (hasLogin) {
      return <RouteComponent {...routeProps} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: routeProps.location.pathname,
            },
          }}
        />
      );
    }
  }
  return <Route path={path} render={render} />;
}


/**
 * Route里面想要配置路径匹配可渲染的组件  有三种方式
 * 
 * 1. compoennt 直接指定一个组件  渲染component并传递props
 * 2.render 是一个渲染函数,如果路径匹配的话,会把routeProps传递给函数,并渲染函数返回值
 * 3.children  是否匹配都会调用
 */