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
        // return FunctionComponent(this.props,this.props.ref2)
        return <FunctionComponent {...this.props}  />
      }
    }
}

function useImperativeHandle(ref,init){
  ref.current = init()
}



/**
 *forwardRef是高阶组件,经过包裹的函数组件可以具有ref转发的功能
 */

/**
 * 经过转发ref的函数组件会有两个参数
 */
function FunctionChild(props, ref) {
  // 当这个虚拟的input组件,挂载在页面之后,会给ref.current赋值

  // 我控制可以控制上级组件的操作
  let inputRef = React.useRef()
  // useImperativeHandle可以控制子组件向外暴露的方法
  // 参数1是ref,,参数2是回调函数返回对象,会给current
  useImperativeHandle(ref,()=>({
    focus(){
      inputRef.current &&  inputRef.current.focus()
    }
  }))
  return <input ref={inputRef} />;
}

const ForwardFunctionChild = React.forwardRef(FunctionChild);



function App() {
  const [id, setID] = React.useState(1);
  let functionChildRef = React.useRef();
 

  React.useEffect(() => {
     console.log(functionChildRef);
  });

  const getFocues = () => {
    functionChildRef.current.focus()
  }
  return (
    <div>
      <p>id:{id}</p>
      {/* 函数组件不能给ref,报错 Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */}
      {/* <FunctionChild  ref={functionChildRef}  />   使用forwardRef解决  转发ref */}
      {/* ref={functionChildRef} 正常应该这么写,但是源码中ref被保护了,不可读取(比较特殊,是一个内部保护的变量),为了模拟就先用ref2 */}
      <ForwardFunctionChild   ref={functionChildRef} />  
   
      <button onClick={() => setID(id + 1)}>改变id</button>
      <button onClick={getFocues}>改变焦点</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
  hookIndex = 0;
}
render();
