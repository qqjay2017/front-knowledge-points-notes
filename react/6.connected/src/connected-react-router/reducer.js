import { LOCATION_CHANGE } from './actions'

function connectRouter (history){

    const initialRouterState = {
        location: history.location, // location: {pathname: "/", search: "", hash: "", state: undefined}
        action: history.action,     // action: "POP"
    }

    return (state=initialRouterState, { type, payload })=>{
        if(type == LOCATION_CHANGE){
            const { location, action } = payload;
            return { ...state, location, action };
        }
        return state;
    }


}

export default connectRouter;