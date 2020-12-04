import * as actionTypes from '../action.types'

function reducer(state = {
    number: 3
}, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:

            return {
                number: state.number + action.payload
            };

        case actionTypes.DECREMENT:
            return {
                number: state.number - action.payload
            };
            default:
                return state;
    }
}


export default reducer;