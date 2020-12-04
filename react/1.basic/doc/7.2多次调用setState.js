import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

/**
 * 处于性能考虑,react可能会把多次setState合并成一次
 * 当你在事件处理函数中执行setState,组件并不会立刻渲染,而是先把更新存起来,等事件处理函数执行完了再批量更新
 * 
 */


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
   
  }

  handleClick = ()=>{
    this.setState({
      number:this.state.number +1
    })
    console.log(this.state.number)  // 0 
    this.setState({
      number:this.state.number +1
    })
    console.log(this.state.number)  // 0


    // 参数是对象,基于上一次的值,调用了2次,但是最终结果是1;
    // 因为第二次调用时候,this.state.number还是0,所以结果是1
  }
  handleClick2 = ()=>{
    this.setState((state)=>({number:state.number+1}),()=>{
      console.log(this.state.number,'callback') //2
    }) // 参数是函数,就是基于上一次的值,回调里面会拿到更新全部完成的值
    console.log(this.state.number,'1')    // 0
    this.setState((state)=>({number:state.number+1}),()=>{
      console.log(this.state.number,'callback2') //2
    }) 
    console.log(this.state.number,'2')    // 0
    /**
     * 最终结果是2
     */
  }
 

  render() {
    return (
      <div className={this.props.name}>
        <h1>{this.state.number}</h1>
        <button onClick={this.handleClick2}>+</button>
        <button>-</button>
      </div>
    );
  }
}

let element = <Counter />;

ReactDOM.render(element, root);
