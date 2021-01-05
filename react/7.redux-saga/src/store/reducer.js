import * as actionTypes from './action-types'

const reducer = (state={number:0},action)=>{
    switch (action.type) {
        case actionTypes.ADD:
                return {number:state.number+1}
        default:
            return state;
    }
}
export default reducer;