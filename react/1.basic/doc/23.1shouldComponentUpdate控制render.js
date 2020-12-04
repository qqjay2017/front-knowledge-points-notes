import React from "react";
import ReactDom from "react-dom";

class Count extends React.Component {
  state = {
    name: "zf",
    number: 0,
  };
  handleClick = (event, amount) => {
    this.setState({
      number: this.state.number + amount,
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    // 如果return false,render方法就不会执行
    const oldStateArr = Object.keys(this.state);
    const newStateArr = Object.keys(nextState);
    if (oldStateArr.length !== newStateArr.length) {
      return true;
    }
    for (let oldKey in this.state) {
      // 一个个对比
      if (this.state[oldKey] !== nextState[oldKey]) {
        return true;
      }
    }
    return false;
  }
  render() {
    console.log("render");
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.number}</p>
        <div>
          <button
            onClick={(event) => {
              this.handleClick(event, 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

ReactDom.render(<Count />, document.querySelector("#root"));
