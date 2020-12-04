import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

class Hello extends React.Component {

  render(){
    return (<div>
      <button onClick={this.props.show}>show</button>
    </div>)
  }
}

const loading = message => OldComponent => {
  return class extends React.Component {

    show = ()=>{
     const element =  document.createElement('div')
      element.innerText = message;
      document.body.appendChild(element)
    }
    
    render(){


      return <OldComponent message={message}  {...this.props}  show={this.show} />
    }
  }
}

/**
 * 高阶组件的使用:高阶组件实际上就是一个函数
 * 
 * 属性代理:给老组件添加新的组件
 */

let Loading = loading('hello')(Hello)

ReactDOM.render(<Loading />, root);
