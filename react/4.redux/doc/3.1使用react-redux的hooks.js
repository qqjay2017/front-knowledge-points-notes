
import React, { useMemo } from 'react'
import { connect, useSelector , useDispatch} from 'react-redux';
import action from '../store/actions/count3'
import * as actionType from '../store/action.types'
function Count3(props) {

    const result = useSelector(state => state.count3);
    const dispatch = useDispatch()

    function add() {
        // console.log(action[actionType.INCREMENT])
        // dispatch(action[actionType.INCREMENT]())
        // props.INCREMENT(2)
        dispatch(action[actionType.INCREMENT](3))

    }
    return <div>
        <h1>{JSON.stringify(result)}</h1>
        <button onClick={add}>+</button>
        <button>-</button>
    </div>
}


/**
 * connect  高阶组件,可以给组件内传递state和action(类组件和函数组件都可以用)
 * 如果不用connnet,可以使用hooks
 * useSelector   替代mapStateToProps
 * useDispatch    获取useDispatch
 * useStore       获取store
 * 
 * 
 */
// export default connect(
//     (state) => state,
//     action
// )(Count3);


export default Count3;