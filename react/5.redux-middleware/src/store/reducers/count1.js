function count1Reducer(state = {
    number: 11
}, action) {
    console.log(action)
    switch (action.type) {
        case 'ADD1':

            return {
                number: state.number + 1
            }

        case 'MINUS1':

            return {
                number: state.number - 1
            };

        default:
            return state;

        case 'ADD1_FULFILLED':
            return {
                number: state.number + action.payload
            }
    }
}

export default count1Reducer;