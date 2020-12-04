import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Count from './components/Counter'

import {action} from './store'
import actions from './store/action'


function App(props) {

  
  /**
   *    onIncrement={() => action('INCREMENT')}
     onDecrement={() => action('DECREMENT')}
     onIncrementAsync={() => action('INCREMENT_ASYNC')}
   */
    
  return <div>
     <Count value={props.number}
         onIncrement={props.add}
         onDecrement={props.minus}
         onIncrementAsync={props.asyncAdd}
     />
  </div>;
}

export default connect(
  state=>state.count,
  actions
)(App);
