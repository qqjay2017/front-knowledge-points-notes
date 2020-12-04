import React from "react";
import ReactDOM from "react-dom";

/**
 *
 *
 * useState的性能优化
 * 
 * 1.Object.is
 * 调用useState的更新函数值,如果传入的是旧的值,react会跳过渲染和effect的过程(react使用Object.is来比较)
 * 
 * 2.减少渲染次数
 *
 */
let lastState;

function useState(initState) {
  lastState = lastState || typeof initState === 'function' ?initState() :initState ;
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
  
  const [count, setCount] = React.useState(()=>{   // 惰性初始化
    return {
      count:0
    }
  });
  const countRef = React.useRef(0);

  function lazyUpdate(){
    setTimeout(() => {
      // setCount参数是函数时候可以用于延迟更新,参数里面的x是上次更新后的值
      setCount(x=>({
        count:x.count+1
      }))
      // setCount(count+1)   // 这么写的话连点多次还是1
    }, 1000);
  }
  return (
    <div>
      <p>{count.count}</p>
      <button
        onClick={() => {
          // debugger
          setCount((x) => x + 1);
          countRef.current = count + 1;
        }}
      >
        +
      </button>
  
      <button onClick={lazyUpdate}>lazyUpdate</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<Count />, document.getElementById("root"));
}
render();
