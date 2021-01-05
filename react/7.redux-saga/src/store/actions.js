import * as actionTypes from './action-types'

const actions = {
    add(){
        return {type:actionTypes.ADD}
    },
    asyncAdd(){
        return {type:actionTypes.ASYNC_ADD}
    }
}

export default actions;