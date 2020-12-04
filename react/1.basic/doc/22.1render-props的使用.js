import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

/**
 * 代码复用
 * 方式1: this.props.children
 * 方式2: render属性
 */

class MouseTracker extends React.Component {
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
      {this.props.children(this.state)}
    </div>)
  }
}


class MouseTracker2 extends React.Component {
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
        {/* render属性是一个函数 */}
      {this.props.render(this.state)}
    </div>)
  }
}

// 用children的方式

const element1 = <MouseTracker >

  {
    props => {
      return (<div>
        <h1>移动鼠标</h1>
        <p>当前的鼠标移动位置,X:{props.x},Y:{props.y}</p>
      </div>)
    }
  }
</MouseTracker>

// 用render属性的方式
const element2 = <MouseTracker2
  render={
    props => {
      return (<div>
        <h1>移动鼠标</h1>
        <p>当前的鼠标移动位置,X:{props.x},Y:{props.y}</p>
      </div>)
    }
  }
>
</MouseTracker2>

ReactDOM.render(element2, root);
