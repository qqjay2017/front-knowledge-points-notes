import React from "react";
import { connect, useStore } from "react-redux";

import countAction from '../store/actions/count'
/**
 * connect  帮助我们实现组件和仓库的链接
 * @param {*} props
 */

class Count3 extends React.Component {
  render() {
      console.log(this.props.add,'propsprops')
    return (
      <div>
        <div>{this.props.number}</div>
        <button  onClick={()=>this.props.add(2)} >add</button>
      </div>
    );
  }
}
// 输入,仓库的数据输入到组件属性对象
function mapStateToProps(state){    // 总状态,处理成要用的状态
    
    return state.count
}

// 输出
function mapDispatchToProps(dispatch){
    return 
}

/**
 * 组件和仓库是什么关系
 * 
 * 1.输入:仓库的数据输入到组件显示
 * 2.输出:组件派发动作.修改仓库的状态
 */
export default  connect(
    mapStateToProps,

    countAction,  // 可以直接将actionCreator返回

)(Count3) ;
