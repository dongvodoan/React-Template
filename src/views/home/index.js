// @flow weak
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewActions       from '../../actions/viewAction';
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
                //  views
                ...viewActions
            },
            dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageHome);
