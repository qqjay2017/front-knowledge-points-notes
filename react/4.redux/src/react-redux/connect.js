import React, { useContext, useMemo, useLayoutEffect, useReducer } from "react";
import ReduxContext from "./ReduxContext";
import { bindActionCreators } from "../redux";

/**
 *
 * @param {*} mapStateToProps
 * @param {Function|Object|null} mapDispatchToProps 可以是函数,对象,null
 */

function connect(mapStateToProps, mapDispatchToProps) {
  return function (ConnectComponent) {
    // HOC 高阶组件,参数是一个组件,然后返回一个新组件
    return function (props) {
      const { store } = useContext(ReduxContext);
      const { getState, dispatch, subscribe } = store;
      const prevState = getState();
      // 获取传给子组件的state
      const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]);
      // 获取传给子组件的dispatch
      const dispatchProps = useMemo(() => {
        let dispatchProps;
        if (typeof mapDispatchToProps === "object") {
          // 如果是对象的,action和dispatch绑定
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch, props);
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [dispatch, props]);
      // 使用useReducer强制刷新视图
      const [, forceUpdate] = useReducer((x) => x + 1, 0);
      //    视图渲染前掉刷新方法
      useLayoutEffect(() => subscribe(forceUpdate), [subscribe]);
      return <ConnectComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}

export default connect;
