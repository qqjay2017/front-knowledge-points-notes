import { routerMiddleware } from '../connected-react-router'

import { createBrowserHistory,createHashHistory } from 'history'
import {   applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './reducers/index'

export const history = createBrowserHistory()

function configureStore(preloadedState){
    const store = createStore(
        createRootReducer(history),// root reducer with router state
        preloadedState,
        compose(
           applyMiddleware(
            routerMiddleware(history),// for dispatching history actions
            // ... other middlewares ...
           )
        )
    )
    return store
}


export default configureStore;