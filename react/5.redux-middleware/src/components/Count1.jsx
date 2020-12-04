import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import count1Action from '../store/actions/count1'

function Count1() {
  const count1 = useSelector((state) => state.count1);
  const action =  bindActionCreators(count1Action,useDispatch())
  
    console.log(111111111111)
  return (
    <div>
      <h1>{count1.number}</h1>
      <button onClick={action.add}>ADD1</button>
      <button onClick={action.promiseAdd}>promiseAdd</button>
      <button onClick={action.thunkAdd}>thunkAdd</button>
      <button onClick={action.thunkAdd1}>thunkAdd1</button>
    </div>
  );
}

export default memo(Count1);
