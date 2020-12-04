import count1Reducer from './count1'
import count2Reducer from './count2'
import { combineReducers } from 'redux'


const reducers = {
    count1:count1Reducer,
    count2:count2Reducer
}

const combineReducer =  combineReducers(reducers)





 export default combineReducer;