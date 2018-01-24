// @flow
import auth                   from '../services/auth';
import { postLoginPlatform, postRegister, postLoginServer } from '../services/api';

import {
    DISCONNECT_USER,
    CHECK_IF_USER_IS_AUTHENTICATED,
    REQUEST_LOG_USER,
    RECEIVED_LOG_USER,
    ERROR_LOG_USER,
    REQUEST_REG_USER,
    RECEIVED_REG_USER,
    ERROR_REG_USER
} from '../constants/userAuthType'
import moment from "moment";

/**
 *
 * set user isAuthenticated to false and clear all app localstorage:
 *
 * @export
 * @returns {action} action
 */
export function disconnectUser() {
    auth.clearAllAppStorage();
    return {
        type: DISCONNECT_USER
    };
}


/**
 *
 * check if user is connected by looking at locally stored
 * - token
 * - user fonrmation
 *
 * @export
 * @returns {action} action
 */
export function checkUserIsConnected() {
    const token: any   = auth.getToken();
    const user: any    = auth.getUserInfo();
    const checkUserHasId  = (obj: any) => obj && obj._id;
    const isAuthenticated = (token && checkUserHasId(user)) ? true : false;

    return {
        type: CHECK_IF_USER_IS_AUTHENTICATED,
        token,
        ...user,
        isAuthenticated
    };
}

function requestLoginUser(time = moment().format()) {
    return {
        type:       REQUEST_LOG_USER,
        isFetching: true,
        time
    };
}
function receivedLoginUser(data, time = moment().format()) {
    return {
        type:       RECEIVED_LOG_USER,
        isFetching: false,
        data,
        time
    };
}
function errorLoginUser(time = moment().format()) {
    return {
        type:       ERROR_LOG_USER,
        isFetching: false,
        time
    };
}

/**
 *
 *  user login
 *
 * @param {string} login user login
 * @param {string} password usepasswordr
 * @returns {Promise<any>} promised action
 */
function logUserPlatform(username, password) {
    return dispatch => {
        dispatch(requestLoginUser());
        postLoginPlatform(username, password)
            .then(
                res => postLoginServer(res.data.access_token)
            )
            .then(
                data => dispatch(receivedLoginUser(data))
            )
            .catch(
                error => dispatch(errorLoginUser(error))
            );
    };
};

export function logUserIfNeeded(
    username: string,
    password: string
): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean
    ): any => {
        if (shouldLogUser(getState())) {
            return dispatch(logUserPlatform(username, password));
        }
        return Promise.resolve('already logged in...');
    };
}

function shouldLogUser(
    state: any
): boolean {
    const isLogging = state.userAuth.isLogging;
    if (isLogging) {
        return false;
    }
    return true;
}

function requestRegisterUser(time = moment().format()) {
    return {
        type:       REQUEST_REG_USER,
        isFetching: true,
        time
    };
}
function receivedRegisterUser(data, time = moment().format()) {
    return {
        type:       RECEIVED_REG_USER,
        isFetching: false,
        data,
        time
    };
}
function errorRegisterUser(time = moment().format()) {
    return {
        type:       ERROR_REG_USER,
        isFetching: false,
        time
    };
}

export function registerUser(
    username: string,
    email: string,
    password: string,
    confirm_password: string,
): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldRegUser(getState())) {
            return dispatch(regUser(
                username,
                email,
                password,
                confirm_password,
            ));
        }
        return Promise.resolve('already logged in...');
    }
}

function shouldRegUser(
    state: any
): boolean {
    const isRegistering = state.userAuth.isRegistering;
    if (isRegistering) {
        return false;
    }
    return true;
}

function regUser(
    username,
    email,
    password,
    confirm_password,
) {
    return dispatch => {
        dispatch(requestRegisterUser());
        postRegister(
            username,
            email,
            password,
            confirm_password,
        )
            .then(
                data => dispatch(receivedRegisterUser(data)))
            .catch(
                error => dispatch(errorRegisterUser(error))
            );
    };
};

//
// /**
//  * fetch user info
//  *
//  * NOTE: this shows a use-case of fetchMiddleware
//  *@param {string} [id=''] user id
//  * @returns {Promise<any>} returns fetch promise
//  */
// function fetchUserInfosData(id = '') {
//     return dispatch => {
//         const token = auth.getToken();
//         const FETCH_TYPE  = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';
//
//         const mockResult  = { token: userInfosMockData.token, data: {...userInfosMockData}}; // will be fetch_mock data returned (in case FETCH_TYPE = 'FETCH_MOCK', otherwise cata come from server)
//         const url         = `${getLocationOrigin()}/${appConfig.API.users}/${id}`;
//         const method      = 'get';
//         const headers     = { authorization: `Bearer ${token}` };
//         const options     = { credentials: 'same-origin' }; // put options here (see axios options)
//
//         return dispatch({
//             type: 'FETCH_MIDDLEWARE',
//             fetch: {
//                 // common props:
//                 type: FETCH_TYPE,
//                 actionTypes: {
//                     request:  REQUEST_USER_INFOS_DATA,
//                     success:  RECEIVED_USER_INFOS_DATA,
//                     fail:     ERROR_USER_INFOS_DATA
//                 },
//                 // mock fetch props:
//                 mockResult,
//                 // real fetch props:
//                 url,
//                 method,
//                 headers,
//                 options
//             }
//         });
//     };
// }
//
// export function fetchUserInfoDataIfNeeded(
//     id: string = ''
// ) {
//     return (
//         dispatch,
//         getState
//     ) => {
//         if (shouldFetchUserInfoData(getState())) {
//             return dispatch(fetchUserInfosData(id));
//         }
//         return Promise.resolve();
//     };
// }
//
// /**
//  *
//  * determine wether fetching should occur
//  *
//  * rules:
//  * - should not fetch twice when already fetching
//  * - ...more rules can be added
//  *
//  * @param {Immutable.Map} state all redux state (immutable state)
//  * @returns {boolean} flag
//  */
// function shouldFetchUserInfoData(state): boolean {
//     const userInfos = state.userAuth;
//     if (userInfos.isFetching) {
//         return false;
//     }
//     return true;
// }
