import React, { useReducer } from "react";
import ReactDOM from "react-dom";

/**
 * 处理器,返回一个新的值
 * @param {*} state 旧的值
 * @param {*} action 动作
 */
function reducer(state, action) {

  switch (action.type) {
    case "ADD":
      return { number: state.number + 1 };
    case "MINUS":
      return { number: state.number - 1 };
    default:
      return state;
  }
}
let initializerArg = 1;
// 初始化函数,接收初始化值,return一个新的值
function initializer(initialState) {
  return { number: initialState };
}

function App() {
  // useReducer需要三个参数,对应的分别是处理器,初始值,初始化函数,
  const [state, dispatch] = useReducer(reducer, initializerArg, initializer);
  function handleAddClick() {
    dispatch({type:'ADD'});
  }

  return (
    <div>
      <h1>{state.number}</h1>
      <button onClick={handleAddClick}>+</button>
      <button onClick={()=>dispatch({type:'MINUS'})}>-</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
