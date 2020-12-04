import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 * 类组件需要创建实例,性能较差,函数组件不需要创实例,
 * 
 * 函数组件:
 * 1.每次组件渲染都是一个独立的闭包
 * 
 */



 

function Count (){
  const [count,setCount] = useState(0)
  const countRef = useRef(0)
  function alertCount (){
    setTimeout(() => {
        console.log(count)   //指向当时渲染时候的count,而不会指向最新的值
        console.log(countRef.current)  //useRef可以渠道最新的值
    }, 1000);
  }
  return (<div>
    <p>{count}</p>
    <button onClick={()=>{
      setCount(count+1);
      countRef.current = count+1
    }}>+</button>
    <button onClick={alertCount}>alertCount</button>
  </div>)
}

ReactDOM.render(
  <Count />,
  document.getElementById('root')
);

