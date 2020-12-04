import React from "react";
import { createBrowserHistory } from "../history";
import Router from "../react-router/Router";

/**
 * Router两个作用,
 * 1.将location信息传给Route
 * 2.监听路由变化
 */

export default class BrowserRouter extends React.Component {
  history = createBrowserHistory(this.props);


  render() {
    
    return <Router history={this.history}>{this.props.children}</Router>;
  }
}
