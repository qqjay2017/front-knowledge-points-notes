import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/**
 * 自定义hooks,
 * 1.调其他hooks
 * 2.use开头(必须,否则报错)
 * 
 */


 function useNumber(initNumber){
  let [number,setNumber] = useState(initNumber||0);

  useEffect(()=>{
      setInterval(() => {
        setNumber(number=>number+1)
      }, 1000);
  },[])
  return number

 }

function Timer1(){
  let number = useNumber(1)
return (<div>{number}</div>)
}

function Timer2(){
  let number = useNumber(10)

return (<div>{number}</div>)
}



function App() {
  return (<div>
    <Timer1 />
    <Timer2 />
  </div>)
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));

}
render();
