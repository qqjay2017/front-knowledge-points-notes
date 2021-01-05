import { put ,take } from '../redux-saga/effects'

import * as actionTypes from './action-types'

export function* rootSagas(){
    
    for(let i=0;i<3;i++){
        // take  等待未来的effect
         yield take(actionTypes.ASYNC_ADD)
     
       const res =  yield put({
            type:actionTypes.ADD
        })
        console.log(res,'res')
    }
    console.log('已经达到最大值')
}