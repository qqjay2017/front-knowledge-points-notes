import React, { useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Animation (){
  let divRef = useRef()

  // useEffect是宏任务,在dom渲染之后执行,所以可以看到动画
  // 用处:
  useEffect(()=>{
    divRef.current.style.transform = 'translate(500px)';
    divRef.current.style.transition = 'all 500ms'
  },[]);
  // useLayoutEffect是微任务,在dom渲染之前就执行,所以看不到动画
  // 实现:useEffect的settimeout改成   queueMicrotask,添加一个微任务
  // 用处:
  useLayoutEffect(()=>{
    
    divRef.current.style.transform = 'translate(500px)';
    divRef.current.style.transition = 'all 500ms'
  },[])
  let style = {
    width:'100px',
    height:'100px',
    backgroundColor:'red'
  }
  return(<div style={style}  ref={divRef}></div>)
}



function App() {
  return <Animation /> 
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));

}
render();
