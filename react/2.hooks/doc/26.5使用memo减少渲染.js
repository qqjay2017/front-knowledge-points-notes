import React, { memo, useState } from "react";
import ReactDOM from "react-dom";


function Count (props){
  console.log('渲染count')
  return (<div><h1>
    {props.number}
    </h1></div>)
}

// 使用memo套一下,如果props没有改变将不会重新渲染
const MemoCount = memo(Count)


function App (){
  console.log('渲染App')
    const [number,setNumber] = useState(1)
    const [name,setName] = useState('2222')
    return (<div>
        <input  value={name} onInput={(event)=>setName(event.target.value)} />
        <MemoCount  number={number}  />
    </div>)
}



ReactDOM.render(<App />, document.getElementById("root"));
