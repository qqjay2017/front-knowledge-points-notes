import { createStore,applyMiddleware } from 'redux'
import reduce from './reducers'
import createSagaMiddleware  from 'redux-saga'

import {rootSaga} from './sagas'

const sagaMiddleware = createSagaMiddleware()


const store =           applyMiddleware(sagaMiddleware)(createStore)(reduce)

sagaMiddleware.run(rootSaga)

export const action = type => store.dispatch({type})

export default store;