import  {connectRouter } from "../../connected-react-router";
import  { combineReducers } from "redux";

import count from   './count'

const createRootReducer = (history)=>combineReducers(
    {
        router:connectRouter(history),
        count
    }
)

export default createRootReducer;