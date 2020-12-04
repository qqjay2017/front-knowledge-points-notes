import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Count2() {
  const count2 = useSelector((state) => state.count2);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    
    dispatch({ type: "ADD2" });
  }, [dispatch]);
  console.log('222222222222222')
  return (
    <div>
      <h1>{count2.number}</h1>
      <button onClick={add}>ADD2</button>
    </div>
  );
}

export default memo(Count2);
