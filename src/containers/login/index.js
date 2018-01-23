// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../actions/viewAction';
import * as userAuthActions   from '../../actions/userAuthAction';
import Login                  from './Login';

const mapStateToProps = (state) => {
  return {
    // containers:
    currentView:  state.views.currentView,

    // useAuth:
    isAuthenticated: state.userAuth.isAuthenticated,
    isError:         state.userAuth.isError,
    errorMessage:    state.userAuth.errorMessage,
    isFetching:      state.userAuth.isFetching,
    isLogging:       state.userAuth.isLogging,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // containers:
      ...viewsActions,
      // userAuth:
      ...userAuthActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
