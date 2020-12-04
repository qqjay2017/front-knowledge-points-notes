import { createStore } from  "redux";

import reducer from './reducers/index'


const store = createStore(reducer)
// console.log(store.getState())

export default store;