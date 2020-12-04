import React, { useEffect } from "react";
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

  return [hookState[hookIndex++], setState];
}

function useRef() {
  hookState[hookIndex] = hookState[hookIndex] || { current: null };
  return hookState[hookIndex++];
}

function forwardRef(FunctionComponent) {
    return class extends React.Component {
    
      render(){
        console.log(this.props)
        return FunctionComponent(this.props,this.props.ref2)
      }
    }
}



/**
 *forwardRef是高阶组件,经过包裹的函数组件可以具有ref转发的功能
 */

/**
 * 经过转发ref的函数组件会有两个参数
 */
function FunctionChild(props, ref) {
  return <input ref={ref} />;
}

const ForwardFunctionChild = forwardRef(FunctionChild);

class ClassChild extends React.Component {
 
  render() {
    return <input />;
  }
}

function App() {
  const [id, setID] = React.useState(1);
  let functionChildRef = React.useRef();
  let classChildRef = React.useRef();
  let classChildRef2 = React.createRef();

  React.useEffect(() => {
     console.log(functionChildRef);
  });
  return (
    <div>
      <p>id:{id}</p>
      {/* 函数组件不能给ref,报错 Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */}
      {/* <FunctionChild  ref={functionChildRef}  />   使用forwardRef解决  转发ref */}
      {/* ref={functionChildRef} 正常应该这么写,但是源码中ref被保护了,不可读取(比较特殊,是一个内部保护的变量),为了模拟就先用ref2 */}
      <ForwardFunctionChild   ref2={functionChildRef} />  
      <ClassChild ref={classChildRef2} />
      <button onClick={() => setID(id + 1)}>改变id</button>
      <button onClick={() => functionChildRef.current.focus()}>改变焦点</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
  hookIndex = 0;
}
render();
