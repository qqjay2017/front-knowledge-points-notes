import React from "./react";
import ReactDOM from "./react-dom";


const root = document.getElementById("root");

/**
 * 生命周期流程
 * 
 * 1. mounting 系列
 * setup1 : 构造器  set up props and state
 * setup2 : componentWillMount
 * setup3 : render
 * setup4 : componentDidMount
 * 
 * 2.updation 系列
 * 
 *setup5 :  shouldComponentUpdate  询问是否更新,返回布尔值
 * 
 *        false   没事了
 *        true   setup5 :componentWillUpdate将要更新   =>  setup3 : render   =>  setup6 :componentDidUpdate更新结束
 */


// setup5 : shouldComponentUpdate
// index.js:66 setup5 :componentWillUpdate
// index.js:49 setup3 : render
// index.js:69 setup6 :componentDidUpdate


class Count extends React.Component {
  static defaultProps = { // 属性
    name: 'zhufeng'
  }
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
    console.log("setup1 : set up props and state")

  }

  componentWillMount() {
    console.log('setup2 : componentWillMount')
  }
  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    })
  }


  render() {
    console.log('setup3 : render')
    return (<div>
     <p>{this.state.number}</p>
     
       <ChildCount number={this.state.number } />
      <button onClick={this.handleClick}>+</button>
    </div>)
  }

  componentDidMount() {
    console.log('setup4 : componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('setup5 : shouldComponentUpdate')
    // return nextState.number % 2 === 0
    return true
  }

  componentWillUpdate() {
    console.log('setup5 :componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('setup6 :componentDidUpdate')
  }
}


class ChildCount extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log('ChildCount1  init props state')
  }

  componentWillMount() {
    console.log('ChildCount2  componentWillMount')
  }

  render() {
    console.log('ChildCount3  render')
    return <div>
      <h1>{this.props.number}</h1>111
    </div>
  }

  componentDidMount() {
    console.log('ChildCount4  componentDidMount')
  }
  
  componentWillUnmount(){
    console.log('ChildCount5  componentWillUnmount')
  }

  // props更新后,在render前调用
  componentWillReceiveProps(){
    console.log('ChildCount componentWillReceiveProps')
  }

  componentWillUpdate(){
    console.log('ChildCount componentWillUpdate')
  }
  componentDidUpdate(){
    console.log('ChildCount componentDidUpdate')
  }
}

let element = <Count />;




ReactDOM.render(element, root);





