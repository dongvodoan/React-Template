// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../actions/viewAction';
import * as userAuthActions   from '../../actions/userAuthAction';
import Register               from './Register';

const mapStateToProps = (state) => {
  return {
    // containers:
    currentView:  state.views.currentView,

    // useAuth:
    isAuthenticated: state.userAuth.isAuthenticated,
    isAccountCreated:state.userAuth.isAccountCreated,
    isError:         state.userAuth.isError,
    errorMessage:    state.userAuth.errorMessage,
    isFetching:      state.userAuth.isFetching,
    isRegistering:   state.userAuth.isRegistering,

    // redux form
    syncValidation: state.form.syncValidation
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
)(Register);
