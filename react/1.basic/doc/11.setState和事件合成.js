import React from "./react";
import ReactDOM from "./react-dom";
// import { updateQueue } from './Component'

const root = document.getElementById("root");

/**
 * 处于性能考虑,react可能会把多次setState合并成一次
 * 当你在事件处理函数中执行setState,组件并不会立刻渲染,而是先把更新存起来,等事件处理函数执行完了再批量更新
 * 
 * 总结:
 * 1.在事件处理中,或在生命函数中,是批量更新的
 * 2.在其他地方是同步更新,比如setTimeout(宏任务)
 */


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };

  }

  handleClick = () => {
    // updateQueue.isBatchingUpdate = true;
    this.setState({
      number: this.state.number + 1
    })
    console.log(this.state.number)  // 0 
    this.setState({
      number: this.state.number + 1
    })
    console.log(this.state.number)  // 0
    // updateQueue.batchUpdate()

    // 参数是对象,基于上一次的值,调用了2次,但是最终结果是1;
    // 因为第二次调用时候,this.state.number还是0,所以结果是1
  }


  handleClick2 = () => {
    this.setState((state) => ({ number: state.number + 1 }), () => {
      console.log(this.state.number, 'callback') //2
    }) // 参数是函数,就是基于上一次的值,回调里面会拿到更新全部完成的值
    console.log(this.state.number, '1')    // 0
    this.setState((state) => ({ number: state.number + 1 }), () => {
      console.log(this.state.number, 'callback2') //2
    })
    console.log(this.state.number, '2')    // 0
    /**
     * 最终结果是2
     */
  }
  // 在setTimeout里面异步调用,打印是有更新
  handleClick3 = () => {
    setTimeout(() => {
      this.setState({
        number: this.state.number + 1
      })
      console.log(this.state.number)  // 1
      this.setState({
        number: this.state.number + 1
      })
      console.log(this.state.number)  // 2
    }, 0)
  }

  /**
   * 同步走完就执行批量更新,
   * 异步的
   */

  handleClick4 = () => {
    this.setState({
      number: this.state.number + 1
    })
    console.log(this.state.number)  // 0
    this.setState({
      number: this.state.number + 1
    })
    console.log(this.state.number)  // 0
    // debugger;

    //  updateQueue.batchUpdate() 这里执行这个,但是setTimeout还没进去
    // 执行完同步代码  isBatchingUpdate变成false,就不走批量更新
    setTimeout(() => {
      this.setState({
        number: this.state.number + 1
      })  // 同步更新  
      console.log(this.state.number)  // 2
      this.setState({
        number: this.state.number + 1
      })// 同步更新  
      console.log(this.state.number)  // 3
    }, 0)

    
  }

  handleClickDiv = ()=>{
    console.log('handleClickDiv')
  }

  handleClickButton =()=>{
    console.log('handleClickButton')
  }


  render() {
    return (
      <div className={this.props.name} onClick={this.handleClickDiv}>
        <h1>{this.state.number}</h1>
        <button onClick={this.handleClick4}>+</button>
        <button onClick={this.handleClickButton}>-</button>
      </div>
    );
  }
}

let element = <Counter name="zf" />;


ReactDOM.render(element, root);
