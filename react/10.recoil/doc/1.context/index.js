import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';

const TodoContext = React.createContext()

function App(){
  const [todoList,setTodoList] = useState([])
  function addTodo(text){
    setTodoList([...todoList,text])
  }
  let contextValue = {todoList,addTodo}
  return (<TodoContext.Provider value={contextValue}>
      <TodoApp />
  </TodoContext.Provider>)
}

function TodoApp(){
  const {addTodo,todoList} =   useContext(TodoContext)
  const [text,setText] = useState('')
  const onChange = (e)=>{
    setText(e.target.value);
  }
  return (<div>
   
    <input  value={text}  onChange={onChange} />
    <button onClick={()=>addTodo(text)}>+</button>
    <ul>
      {todoList.map((todo,index)=>(<li  key={`${todo}-${index}`}>{todo}</li>))}
    </ul>
  </div>)
}


ReactDOM.render(
 
    <App />
,
  document.getElementById('root')
);


