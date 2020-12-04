import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
   
  }
  tick = ()=> {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className={this.props.name}>
        <h1>{this.state.number}</h1>
        <button>+</button>
        <button>-</button>
      </div>
    );
  }
}

let element = <Clock />;

ReactDOM.render(element, root);
