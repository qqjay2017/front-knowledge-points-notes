import React from "react";
import ReactDom from "react-dom";
/**
 * PureComponent的逻辑是
 * 使用shouldComponentUpdate进行state判断
 */

class Count extends React.PureComponent {
  state = {
    name: "zf",
    number: 0,
  };
  handleClick = (event, amount) => {
    this.setState({
      number: this.state.number + amount,
    });
  };
  
  render() {
    console.log("render");
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.number}</p>
        <div>
          <button
            onClick={(event) => {
              this.handleClick(event, 0);
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
