let initState = {
    number: 1
}

function count(state = initState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                number: state.number + 1
            };
        case 'DECREMENT':
            return {
                number: state.number - 1
            };
       
        case 'ADD':
            return {
                number: state.number + 1
            };
        case 'MINUS':
            return {
                number: state.number - 1
            };
        default:
            return state;
    }
}

export default count;