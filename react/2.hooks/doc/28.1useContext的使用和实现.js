import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";

const CountContext = createContext()

function reducer(state,action){
  switch (action.type) {
    case 'ADD':
        return {number:state.number+1}
      break;
  
    default:
      return state;
      break;
  }
}




function useContext(context){
  return context._currentValue
}

function Count(props){
 
    const {state,dispatch} = useContext(CountContext)
    
  // console.log(state)
    return (
  
  <div>
      <h1>{state.number}</h1>
      <button onClick={()=>dispatch({type:'ADD'})}>+</button>
  </div>
   )
}

function App(){
  const [state,dispatch] = useReducer(reducer,{number:0})

  return <CountContext.Provider value={{state,dispatch}}>
    number:{state.number}
      <Count />
  </CountContext.Provider>
}

function render() {
 
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
