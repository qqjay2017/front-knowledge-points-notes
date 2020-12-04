import React, { memo, useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom";

/**
 * useMemo  可以控制无用方法的调用
 * useMemo 如果没有传入依赖:每次渲染都会重新调用
 * useMemo 如果传入一个空数组,只会在初次渲染会调用
 * useMemo 如果传入依赖,会在依赖改变时候调用
 */

function Count (props){
  useMemo(()=>{
    console.log('useMemo')
  },[])
  console.log('渲染count')
  return (<div><button onClick={props.handleClick}>
    {props.data.number}
    </button></div>)
}
const MemoCount = memo(Count)

// 使用memo套一下,如果props没有改变将不会重新渲染
// 仅检查 props 变更。
// memo类似于pureComponent
// const MemoCount = memo(Count)


function App (){
  console.log('渲染App')
    const [number,setNumber] = useState(1)
    const [name,setName] = useState('2222')
    // 每次渲染App,都会重新创建一个data,就算是Count包了memo,改变name的值也会重新渲染MemoCount
    // let data  = {number};

    // 优化,使用useMemo,传入依赖number,当number改变时候才会重新创建data,触发Count渲染
    let data = useMemo(()=>({number}),[number])
    
    // 传给组件的函数使用useCallback包裹,只有在依赖改变时候才会重新创建函数
    // 这里使用setNumber的函数参数,就不需要依赖了,只有在App第一次渲染的时候才创建handleClick
    let handleClick = useCallback(()=>{
      setNumber(x=>x+1);
      
    },[])

    
    return (<div>
        <input  value={name} onInput={(event)=>setName(event.target.value)} />
    
        <MemoCount  data={data} handleClick={handleClick} />
    </div>)
}



ReactDOM.render(<App />, document.getElementById("root"));
