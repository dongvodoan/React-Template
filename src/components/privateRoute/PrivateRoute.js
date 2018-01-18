// @flow weak

import React, {
  Component
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  Route,
  Redirect,
  withRouter
}                         from 'react-router-dom';
import auth               from '../../services/auth';

// #region flow types
type
Props = any;
type
State = any;
// #endregion

class PrivateRoute extends Component<Props, State> {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    component:  PropTypes.any.isRequired,
    path:       PropTypes.string
  };

  render() {
    const {
      component: InnerComponent,
      ...rest
    } = this.props;
    const { location } = this.props;

    const isUserAuthenticated = this.isAuthenticated();
    const isTokenExpired      = this.isExpired();

    return (
      <Route
        {...rest}
        render={
          props => (
              !isTokenExpired && isUserAuthenticated
              ? <InnerComponent {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        }
      />
    );
  }

  isAuthenticated() {
    // const checkUserHasId = user => user && user.id;
    // const user = auth.getUserInfo()  ? auth.getUserInfo() : null;
    // const isAuthenticated = auth.getToken() && checkUserHasId(user);
    const isAuthenticated = auth.getToken();
    return isAuthenticated;
  }

  isExpired() {
    const isTokenExpired =  auth.isExpiredToken(auth.getToken());
    return isTokenExpired;
  }
}

export default withRouter(PrivateRoute);
