import React from "react";
import ReactDOM from "react-dom";

/**
 *
 * 类组件需要创建实例,性能较差,函数组件不需要创实例,
 *
 * 函数组件:
 * 1.每次组件渲染都是一个独立的闭包
 *
 */
let lastState;

function useState(initState) {
  lastState = lastState || initState;
  function setState(newState) {
    // newState可能是一个函数,参数是旧的值
    if (typeof newState == "function") {
      newState = newState(lastState);
    }

    lastState = newState;
    render();
  }
  return [lastState, setState];
}

let lastRef;
function useRef(initRef) {
  lastRef = lastRef || { current: initRef };
  return lastRef;
}

function Count() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  function alertCount() {
    setTimeout(() => {
      console.log(count); //指向当时渲染时候的count,而不会指向最新的值
      console.log(countRef.current); //useRef可以渠道最新的值
    }, 1000);
  }

  function lazyUpdate(){
    setTimeout(() => {
      // setCount参数是函数时候可以用于延迟更新,参数里面的x是上次更新后的值
      setCount(x=>x+1)
      // setCount(count+1)   // 这么写的话连点多次还是1
    }, 1000);
  }
  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          // debugger
          setCount((x) => x + 1);
          countRef.current = count + 1;
        }}
      >
        +
      </button>
      <button onClick={alertCount}>alertCount</button>
      <button onClick={lazyUpdate}>lazyUpdate</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<Count />, document.getElementById("root"));
}
render();
