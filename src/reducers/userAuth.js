// @flow weak
import moment                 from 'moment';
import auth                   from '../services/auth';

import {
    DISCONNECT_USER,
    CHECK_IF_USER_IS_AUTHENTICATED,
    ERROR_LOG_USER,
    RECEIVED_LOG_USER,
    REQUEST_LOG_USER,
    ERROR_USER_INFOS_DATA,
    RECEIVED_USER_INFOS_DATA,
    REQUEST_USER_INFOS_DATA,
    RECEIVED_REG_USER,
    REQUEST_REG_USER,
    ERROR_REG_USER,
    ERROR_LOG_PLATFORM,
} from '../constants/userAuthType'

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    // actions details
    isFetching:      false,
    isLogging:       false,
    isRegistering:      false,
    time:            '',

    // userInfos
    id:              '',
    login:           '',
    firstname:       '',
    lastname:        '',

    token:           null,
    isAuthenticated: auth.isAuthenticated(),   // authentication status (token based auth)
    isAccountCreated: false,
    isError: false,
    errorMessage: ''
};

export default function (
    state = initialState,
    action
) {
    const currentTime = moment().format();

    switch (action.type) {

        case CHECK_IF_USER_IS_AUTHENTICATED:
            return {
                ...state,
                actionTime:      currentTime,
                isAuthenticated: action.isAuthenticated,
                token:           action.token || initialState.token,
                id:              action.user && action.user.id         ? action.user.id:        initialState.id,
                login:           action.user && action.user.login      ? action.user.login:     initialState.login,
                firstname:       action.user && action.user.firstname  ? action.user.firstname: initialState.firstname,
                lastname:        action.user && action.user.lastname   ? action.user.lastname:  initialState.firstname
            };

        case DISCONNECT_USER:
            return {
                ...state,
                actionTime:      currentTime,
                isAuthenticated: false,
                isError: false,
                token:           initialState.token,
                id:              initialState.id,
                login:           initialState.login,
                firstname:       initialState.firstname,
                lastname:        initialState.lastname
            };

        // user login (get token and userInfo)
        case REQUEST_LOG_USER:
            return {
                ...state,
                actionTime: currentTime,
                isLogging:  true
            };

        case RECEIVED_LOG_USER:
            const userLogged = action.data;
            if (userLogged.status === 200) {
                auth.setToken(userLogged.data);
                return {
                    ...state,
                    actionTime:      currentTime,
                    isAuthenticated: true,
                    token:           userLogged.data,
                    // id:              userLogged.id,
                    // login:           userLogged.login,
                    // firstname:       userLogged.firstname,
                    // lastname:        userLogged.lastname,
                    isError: false,
                    errorMessage: '',
                    isLogging:       false
                };
            }

            if (userLogged.status === 422 || userLogged.status === 400) {
                return {
                    ...state,
                    actionTime:      currentTime,
                    isAuthenticated: false,
                    isError:      true,
                    errorMessage:    userLogged.message,
                    isLogging:       false
                };
            }

            // temp
            return {
                ...state
            };
        case ERROR_LOG_USER:
            return {
                ...state,
                actionTime:       currentTime,
                isAuthenticated:  false,
                isLogging:        false
            };

        case ERROR_LOG_PLATFORM:
            return {
                ...state,
                actionTime:           currentTime,
                isAuthenticated:      false,
                isLogging:            false,
                isError:              true,
                errorMessage:         action.msg,
            }

        case REQUEST_REG_USER:
            return {
                ...state,
                actionTime: currentTime,
                isRegistering:  true
            };

        case RECEIVED_REG_USER:
            const userRegistered = action.data;
            if (userRegistered.status === 200) {
                return {
                    ...state,
                    actionTime:       currentTime,
                    isAccountCreated: true,
                    isError:          false,
                    errorMessage:     '',
                    isRegistering:    false
                };
            }

            if (userRegistered.status === 422 || userRegistered.status === 400) {
                return {
                    ...state,
                    actionTime:       currentTime,
                    isAccountCreated: false,
                    isError:          true,
                    errorMessage:     userRegistered.message,
                    isRegistering:    false
                };
            }

            // temp
            return {
                ...state
            };

        case ERROR_REG_USER:
            return {
                ...state,
                actionTime:       currentTime,
                isAccountCreated: false,
                isLogging:        false
            };

        // not used right now:
        case REQUEST_USER_INFOS_DATA:
            return {
                ...state,
                actionTime:   currentTime,
                isFetching:   true
            };

        case RECEIVED_USER_INFOS_DATA: {
            const userInfos = action.userInfos;

            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                id:         userInfos.id,
                login:      userInfos.login,
                firstname:  userInfos.firstname,
                lastname:   userInfos.lastname
            };
        }

        case ERROR_USER_INFOS_DATA:
            return {
                ...state,
                actionTime:   currentTime,
                isFetching:   false
            };

        default:
            return state;
    }
}
