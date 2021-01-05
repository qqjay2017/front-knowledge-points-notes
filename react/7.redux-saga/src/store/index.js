import { createStore ,applyMiddleware} from "redux";
import reducer from './reducer'

import { rootSagas } from './sagas'

import createSagaMiddleware   from "../redux-saga";
let sagaMiddleware = createSagaMiddleware()

let store =applyMiddleware(sagaMiddleware)(createStore)(reducer)
//  createStore(reducer)

sagaMiddleware.run(rootSagas)

export default store