// @flow weak
import React, { Component } from 'react';
import {
    // Router, // using now ConnectedRouter from react-router-redux v5.x (the only one compatible react-router 4)
    Switch,
    Route
}                               from 'react-router-dom';
import { Provider }             from 'react-redux';
import { ConnectedRouter }      from 'react-router-redux';
import { history }              from './store/configureStore';

import configureStore           from './store/configureStore.dev';

import PageNotFound             from './containers/pageNotFound';
import PageProtected            from './containers/protected';
import {
    ScrollTop,
    PrivateRoute
}                               from './components';
import Login                    from './containers/login/index';
import Home                     from './containers/home';
import Register                 from './containers/register';

const store = configureStore();

// #region flow types
type
Props = any;
type
State = any;
// #endregion

class App extends Component<Props, State> {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ConnectedRouter history={history}>
                        <ScrollTop>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <PrivateRoute path="/protected" component={PageProtected} />
                                <Route component={PageNotFound} />
                            </Switch>
                        </ScrollTop>
                    </ConnectedRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
