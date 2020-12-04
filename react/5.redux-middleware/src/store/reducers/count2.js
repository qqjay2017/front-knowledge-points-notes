function count2Reducer(state = {number:22}, action) {
    switch (action.type) {
        case 'ADD2':

            return {
                number: state.number + 1
            }

            case 'MINUS2':

                return {
                    number: state.number - 1
                }

                default:
                    return state;
    }
}

export default count2Reducer;