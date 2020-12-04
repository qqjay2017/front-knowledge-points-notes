import { useEffect, useState } from "react";
import { createStore ,bindActionCreators} from "../redux";
const INCREMENT = "ADD";
const DECREMENT = "MINUS";
let initState = { number: 1 };
/**
 * bindActionCreators 是把action绑定给dispatch
 */

function add(){ // ActionCreators  动作创建者
  return {
    type:INCREMENT
  }
}

function minus (){
  return {
    type:DECREMENT
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 };
    case DECREMENT:
      return { number: state.number - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer, initState);
const actions = bindActionCreators({
  add
},store.dispatch)
function Count() {
 
let [count,setCount] = useState({number:store.getState().number})
  // 调用bindActionCreators,将action和store.dispatch绑定,就不用每次都调用dispatch方法
 
  useEffect(() => {
    const unSubscribe =    store.subscribe(() => {
      setCount({ number: store.getState().number });
    });
    return ()=>{
        unSubscribe()
    }
  }, []);
  return (
    <div>
      <h1>{count.number}</h1>
      {/*boundedAdd   =  () => store.dispatch(add()) */}
      <button onClick={actions.add}>ADD</button>
    </div>
  );
}

export default Count;
