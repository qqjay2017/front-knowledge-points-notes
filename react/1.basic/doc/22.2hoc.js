import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

/**
 * 包装高阶组件
 * 接收一个组件,返回一个新的组件
 */


 const withTracker = OldComponent=>{
   return class MouseTracker extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         x: 0,
         y: 0
       }
     }
     handleMouseMove = (e) => {
       this.setState({
         x: e.clientX,
         y: e.clientY
       })
     }
   
     render() {
       return (<div
         onMouseMove={this.handleMouseMove}
         style={{ width: '100%', height: '100%', border: '1px solid red' }}>
         <OldComponent  {...this.state} />
       </div>)
     }
   }
 }


// 用children的方式

const MouseTracker = withTracker(
  (props)=>(<div>
    <h1>移动鼠标</h1>
    <p>当前的鼠标移动位置,X:{props.x},Y:{props.y}</p>
  </div>)
)


ReactDOM.render(<MouseTracker />, root);
