import reducer from './reducers'

import { applyMiddleware, createStore } from "redux";

import promise from 'redux-promise-middleware'
import ReduxThunk from 'redux-thunk'; 

// Middleware

const store = applyMiddleware(promise,ReduxThunk)(createStore)(reducer)





export default store;