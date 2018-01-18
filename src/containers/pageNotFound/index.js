// @flow weak
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewActions       from '../../actions/viewAction';
import PageNotFound           from './PageNotFound';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        //  containers
        ...viewActions
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNotFound);
