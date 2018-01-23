// @flow weak
import {
    ROOT_API_LOCAL,
    ROOT_API_PRODUCTION,
    ROOT_API_STAGING
} from '../../constants/common';

import request from '../promisedHttpRequest';

let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
    BASE_URL = ROOT_API_LOCAL;
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = ROOT_API_PRODUCTION;
} else {
    BASE_URL = ROOT_API_STAGING;
}

export const postLogin = (username, password) => {
    const url = `${BASE_URL}login`;
    const grant_type = 'password';
    const client_id = '1516594351305';
    const client_secret = 'V0zbKF9ro1mIhf4Hy8i7oisyJs8X2kqm';
    const device = 3; // 1: Android, 2: iOS, 3: Browser
    const data = {
        grant_type,
        client_id,
        client_secret,
        username,
        password,
        device,
    };
    return request.post(url, data);
};

export const postRegister = (
    username,
    email,
    password,
    confirm_password,
) => {
    const url = `${BASE_URL}register`;
    const grant_type = 'password';
    const client_id = '1516594351305';
    const client_secret = 'V0zbKF9ro1mIhf4Hy8i7oisyJs8X2kqm';
    const device = 3; // 1: Android, 2: iOS, 3: Browser
    const data = {
        grant_type,
        client_id,
        client_secret,
        username,
        email,
        password,
        confirm_password,
        device,
    };
    return request.post(url, data);
};
