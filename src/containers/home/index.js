// @flow weak
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewActions       from '../../actions/viewAction';
import * as userAuthActions   from '../../actions/userAuthAction';
import PageHome               from './home';

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
                ...viewActions,
                // userAuth:
                ...userAuthActions
            },
            dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageHome);
