/**
 * 合并多个reducer
 */

import { combineReducers } from 'redux';
import count from './count';
import count2 from './count2'
import count3 from './count3'

/**
 * 下面对象的key
 * store.getState(),作用于这里
 */
const reducers  = {
    count,
    count12:count2,
    count3
}



const combineReducer = combineReducers(reducers);

export default combineReducer;
