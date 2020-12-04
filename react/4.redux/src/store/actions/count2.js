import * as actionTypes from '../action.types'

const action =  {
    add(mount){
        return {
            type:actionTypes.add2,
            payload:mount
        }
    }
}
export default action;