import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'


import configureStore, { history } from './store'
import { ConnectedRouter } from './connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Home from './component/Home'
import Profile from './component/Profile'

const store = configureStore(/* provide initial state if any */)


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/profile" component={Profile}></Route>
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
);


