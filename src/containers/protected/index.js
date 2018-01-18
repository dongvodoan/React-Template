// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../actions/viewAction';
import Protected              from './Protected';


const mapStateToProps = (state) => {
  return {
    // containers
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // containers
      enterProtected: viewsActions.enterProtected,
      leaveProtected: viewsActions.leaveProtected
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Protected);
