import React from "./react";
import ReactDOM from "./react-dom";

/**
 * 组件可能会是一个类,一个函数,一个字符串
 * 
 * 1.jsx会把组件的属性封装成一个props对象,传递给子组件
 * 
 * 
 * 
 * constructor(props){
    super()
    this.props = props;
  }

  2. 组件的名称必须大写开头,因为react是靠开头来区分原生组件还是自定义组件

  3. 组件要先定义,再使用

  4. 组件必须在render返回元素且元素只能有一个根节点


  如何渲染

  1. new Welcome(props)  this.props = props;
  2. 调用实例render方法,得到一个react元素
  3. 把react元素与转换成真实dom元素,插到页面上去
 */

class Welcome extends React.Component {

  render() {
    return (<div className={this.props.name}>
      <h1>hello</h1>
      world
    </div>)
  }

}

let element = <Welcome name="title" />


ReactDOM.render(element, document.getElementById("root"));
