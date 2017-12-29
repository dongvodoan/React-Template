import React, {Component} from 'react';

import {
    Route,
    Redirect,
    withRouter
}                         from 'react-router-dom';

class PrivateRoute extends Component {

    render() {
        const {
            component: InnerComponent,
            ...rest
        } = this.props;
        const { location } = this.props;

        const isUserAuthenticated = true;
        const isTokenExpired      = false;

        return (
            <Route
                {...rest}
                render={
                    props => (
                        !isTokenExpired && isUserAuthenticated
                            ? <InnerComponent {...props} />
                            : <Redirect to={{ pathname: '/', state: { from: location } }} />
                    )
                }
            />
        );
    }

    // isAuthenticated() {
    //     // const checkUserHasId = user => user && user.id;
    //     // const user = auth.getUserInfo()  ? auth.getUserInfo() : null;
    //     const isAuthenticated = auth.getToken();
    //     return isAuthenticated;
    // }

    // isExpired() {
    //     return auth.isExpiredToken(auth.getToken());
    // }
}

export default withRouter(PrivateRoute);
