# react-redux

> https://react-redux.js.org/introduction/quick-start

## Provider

```jsx
  <Provider store={store}>
    <App />
  </Provider>
```

## connect()

- 将组件和 state/dispatch链接起来

```js
export default  connect(
    mapStateToProps,
    countAction,  // 可以直接将actionCreator返回
)(Count3) ;
```

- 参数1  :  输入,仓库的数据输入到组件属性对象,如果不写就是默认state

```js
function mapStateToProps(state){    // 总状态,处理成要用的状态
    return state.count
}
```

 - 参数2  mapDispatchToProps :输出:组件派发动作.修改仓库的状态,可以是对象,可以是函数,

 ```js
function mapDispatchToProps(dispatch,ownProps){
    return {
      add(){
        dispatch({type:'add'})
      }
    }
}

 ```



 ## hooks
 
 React Redux现在提供了一组`hooks api`，以替代现有的`connect()`高阶组件。这些API允许您订阅Redux存储和调度操作，而不必将组件包装在中`connect()`。

 - * useSelector   替代mapStateToProps
 - * useDispatch    获取useDispatch
 - * useStore       获取store


 ## 函数组件控制渲染

 使用`memo`和`useCallback`

 ```js
 import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Count2() {
  const count2 = useSelector((state) => state.count2);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    
    dispatch({ type: "ADD2" });
  }, [dispatch]);
  console.log('222222222222222')
  return (
    <div>
      <h1>{count2.number}</h1>
      <button onClick={add}>ADD2</button>
    </div>
  );
}

export default memo(Count2);

```