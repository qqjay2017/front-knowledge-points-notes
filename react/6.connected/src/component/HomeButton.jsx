import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

// push实际上是一个action
import {push} from '../connected-react-router'

function HomeButton (props){
    const dispatch = useDispatch()
    const state = useSelector(state=>state)
   function gogogo(){
      /**
       * 
payload: {method: "push", args: Array(1)}
type: "@@router/CALL_HISTORY_METHOD"
       * 
       */

   

    dispatch(push('/profile'))
   }

    return <button  onClick={gogogo}>go profile</button>
}

export default HomeButton