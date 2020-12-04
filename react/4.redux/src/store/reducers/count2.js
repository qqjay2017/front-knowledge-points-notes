import * as actionTypes from '../action.types'

let initState = { number: 2 };

function reducer (state = initState, action)  {
    switch (action.type) {
      case actionTypes.add2:
        return { number: state.number + action.payload };
      default:
        return state;
    }
  };

  export default reducer;