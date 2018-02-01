// @flow weak
import { routerReducer }    from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers }  from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import views                from './views';
import userAuth             from './userAuth';

export const reducers = {
    views,
    userAuth
};

export default combineReducers({
    ...reducers,
    routing: routerReducer,
    form: reduxFormReducer,
    firebase: firebaseReducer,
});
