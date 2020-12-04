import * as actionTypes from '../action.types'

const actions = {
    // 增加
    [actionTypes.INCREMENT](mount=1) {
       
        return {
            type: actionTypes.INCREMENT,
            payload: mount 
        }
    },
    // 减少
    [actionTypes.DECREMENT](mount){
        return {
            type:actionTypes.DECREMENT,
            payload: mount || 1
        }
    }           


}

export default actions;