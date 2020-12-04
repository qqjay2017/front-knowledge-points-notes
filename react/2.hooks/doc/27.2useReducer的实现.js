import React from "react";
import ReactDOM from "react-dom";

/**
 * 简单实现useReducer
 * @param {*} reducer 处理器
 * @param {*} initializerArg 初始值
 * @param {*} initializer 初始化函数
 */

let hookStates = [];
let hookIndex = 0;

function useReducer(reducer, initializerArg, initializer) {
  // 初始化赋值操作
  hookStates[hookIndex] =
    hookStates[hookIndex] ||
    (initializer ? initializer(initializerArg) : initializerArg);
  let currentIndex = hookIndex; //缓存闭包的值
  function dispatch(action) {
    hookStates[currentIndex] = reducer
      ? reducer(hookStates[currentIndex], action)
      : action;
    // console.log(hookStates)
    render();
  }

  return [hookStates[hookIndex++], dispatch];
}

// useState是简化版的useReducer,是语法糖

function useState(initState) {
  return useReducer(null, initState);
}

/**
 * 处理器,返回一个新的值
 * reducer就是一个状态转换器,给null的话,就是给啥赋值啥
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
  const [state, dispatch] = React.useReducer(reducer, initializerArg, initializer);
  function handleAddClick() {
    dispatch({ type: "ADD" });
  }

  const [number, setNumber] = useState(0);

  return (
    <div>
      <h1>{state.number}</h1>
      <button onClick={handleAddClick}>+</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>-</button>

      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>+++</button>
    </div>
  );
}

function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
