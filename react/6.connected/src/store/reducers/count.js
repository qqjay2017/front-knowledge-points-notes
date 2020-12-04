
let initState={
    number:1
}
function count(state=initState,action){
    switch (action.type) {
        case 'add':
            return {number:state.number+1}
    
        default:
            return state
    }
}

export default count;