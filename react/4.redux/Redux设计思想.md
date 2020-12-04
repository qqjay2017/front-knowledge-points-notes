# Redux设计思想

 - Redux是将整个应用状态存储到到一个地方，称为store
 - 里面保存一棵状态树state tree
 - 组件可以派发dispatch行为action给store,而不是直接通知其它组件
 - 其它组件可以通过订阅store中的状态(state)来刷新自己的视图

## Redux三大原则

 - 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
 - State 是只读的，惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象 使用纯函数来执行修改，为了描述action如何改变state tree ，你需要编写 reducers
 - 单一数据源的设计让React的组件之间的通信更加方便，同时也便于状态的统一管理


 ## 原生计数器

 ## Redux流程

  - 1.使用createStore,新建store,store传入reducer
  - 2.dispatch触发reducer
  - 3.通过store.getState()拿到新数据
  - 4.store.subscribe() ,订阅,dispatch后触发

## 辅助函数

 * bindActionCreator: 将action和dispatch绑定 
 - `bindActionCreator(actionCreator:Function|Object,dispatch:Function)  `


 编写countAction

 ```js
import * as actionTypes from '../action.types'

const action =  {
    add(mount){
        return {
            type:actionTypes.add1,
            payload:mount
        }
    }
}
export default action;

 ```

 ```js
import countAction from '../store/actions/count';
const actions = bindActionCreators(countAction,store.dispatch);


```

 ```jsx
<button onClick={()=>actions.add(2)}>ADD</button>
 ```



 * combineReducers,合并多个reducer


```js
const reducers  = {
    count,
    count12:count2
}

const combineReducer = combineReducers(reducers);

```
