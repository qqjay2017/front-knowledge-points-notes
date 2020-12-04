import React, { useEffect, } from "react";
import ReactDOM from "react-dom";

/**
 * 如果获取最新的值
 */

// useRef实现

let hookState = [];
let hookIndex = 0;

function useState(initState) {
  hookState[hookIndex] = hookState[hookIndex] || initState;
  let currentIndex = hookIndex;
  function setState(newState) {
    hookState[currentIndex] =
      typeof newState === "function"
        ? newState(hookState[currentIndex])
        : newState;

    render();
  }

  return [ hookState[hookIndex++],setState]
}

function useRef(initRef) {
  hookState[hookIndex] = hookState[hookIndex] || { current: initRef };
  return hookState[hookIndex++];
}

function App() {
  const [id, setID] = useState(1);
  let lastIdRef = useRef();
  let alertId = () => {
    setTimeout(() => {
      console.log(lastIdRef);
      alert(lastIdRef.current);
    }, 1000);
  };
  // 通过useEffect,在每次更新组件后也更新lastIdRef,获取到最新的值
  useEffect(() => {
    lastIdRef.current = id;
  });
  return (
    <div>
      <p>id:{id}</p>

      <button onClick={() => setID(id + 1)}>改变id</button>
      <button onClick={alertId}>alert</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
  hookIndex = 0;
}
render();
