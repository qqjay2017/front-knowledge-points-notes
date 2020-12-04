import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

/**
 * 反向继承
 * 拦截生命周期
 * state
 * 渲染过程
 * @ 装饰器的使用
 */

const wrapper = (OldComponent) => {
  return class NewComponent extends OldComponent {
    constructor(props) {
      super(props);
      console.log("NewComponent constructor");
    }
    handleClick = (e) => {
      this.setState({
        number: this.state.number + 1,
      });
    };
    state = {
      number: 0,
    };
    componentWillMount() {
      console.log("NewComponent componentWillMount");
      super.componentWillMount();
    }
    componentDidMount() {
      console.log("NewComponent componentDidMount");
      super.componentDidMount();
    }

    render() {
      console.log("NewComponent render");
      let renderElement = super.render();
      let newProps = {
        ...renderElement.props,
        ...this.state,
        onClick: this.handleClick,
      };

      return React.cloneElement(renderElement, newProps, this.state.number);
    }
  };
};


@wrapper
class Button extends React.Component {
  constructor(){
    super()
    console.log("OldComponent constructor");
  }
  componentWillMount() {
    console.log("OldComponent componentWillMount");
    
  }
  componentDidMount() {
    console.log("OldComponent componentDidMount");
    
  }
  render() {
    return <button></button>;
  }
}




// let WrappedButton = wrapper(Button);

ReactDOM.render(<Button />, root);
