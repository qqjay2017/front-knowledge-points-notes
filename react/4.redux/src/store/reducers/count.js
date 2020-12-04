import * as actionTypes from '../action.types'

let initState = { number: 1 };

function reducer (state = initState, action)  {
    switch (action.type) {
      case actionTypes.add1:
       
        return { number: state.number + action.payload };
      default:
        return state;
    }
  };

  export default reducer;