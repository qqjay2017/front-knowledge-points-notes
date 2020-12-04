import { useEffect, useState } from "react";
import { createStore } from "redux";
const INCREMENT = "ADD";
const DECREMENT = "MINUS";
let initState = { number: 0 };

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

function Count() {
  const [count, setCount] = useState(initState);
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
      <button onClick={() => store.dispatch({ type: INCREMENT })}>ADD</button>
    </div>
  );
}

export default Count;
