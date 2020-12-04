import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";

import store from '../store'
import countAction from '../store/actions/count';
const actions = bindActionCreators(countAction,store.dispatch)

function Count() {
 
let [count,setCount] = useState({number:store.getState().count.number})
  // 调用bindActionCreators,将action和store.dispatch绑定,就不用每次都调用dispatch方法
 
  useEffect(() => {
    const unSubscribe =    store.subscribe(() => {
      setCount({ number: store.getState().count.number });
    });
    return ()=>{
        unSubscribe()
    }
  }, []);
  return (
    <div>
      <h1>{count.number}</h1>
      {/*boundedAdd   =  () => store.dispatch(add()) */}
      <button onClick={()=>actions.add(2)}>ADD</button>
    </div>
  );
}

export default Count;
