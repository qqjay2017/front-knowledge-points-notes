import React, {  useState } from 'react';
import ReactDOM from 'react-dom';
// RecoilRoot root组件   atom 原子状态   useRecoilState  获取原子状态的hooks
import { RecoilRoot,atom,useRecoilState } from "recoil";

const todoListState = atom({
  key:'todoList',// 全局唯一
  default:['11']   , // 默认值
})


function TodoApp(){
  const [todoList,setTodoList] =   useRecoilState(todoListState)
  const [text,setText] = useState('')
  const onChange = (e)=>{
    setText(e.target.value);
  }
  const addTodo = ()=>{

    setTodoList([...todoList,text])
    setText('')
  }
  return (<div>
   
    <input  value={text}  onChange={onChange} />
    <button onClick={addTodo}>+</button>
    <ul>
      {todoList.map((todo,index)=>(<li  key={`${todo}-${index}`}>{todo}</li>))}
    </ul>
  </div>)
}

function App(){
  return (<RecoilRoot>
    <TodoApp />
  </RecoilRoot>)
}


ReactDOM.render( <App />,document.getElementById('root')
);


