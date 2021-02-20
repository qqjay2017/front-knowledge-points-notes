import React from "react";
import ReactDom from "react-dom";
/**
 * PureComponent的逻辑是
 * 使用shouldComponentUpdate进行state判断
 */

class Count extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log 0 

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log 0

    setTimeout(() => {
      console.log(this.state.val,'state.val');
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log 1

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log 2
    }, 0);
  }
  
  render() {
  
    return (
      <div>
        111
      </div>
    );
  }
}

ReactDom.render(<Count />, document.querySelector("#root"));
