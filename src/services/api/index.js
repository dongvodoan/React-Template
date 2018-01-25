// @flow weak
import {
    ROOT_API_LOCAL,
    ROOT_API_TOKUBUY,
    ROOT_API_PRODUCTION,
    ROOT_API_STAGING
} from '../../constants/common';
import {
  grant_type,
  client_id,
  client_secret,
  device,
  deviceToken,
} from '../../constants/constParams';

import request from '../promisedHttpRequest';

let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
    BASE_URL = ROOT_API_LOCAL;
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = ROOT_API_PRODUCTION;
} else {
    BASE_URL = ROOT_API_STAGING;
}

export const postLoginPlatform = (username, password) => {
    const url = `${BASE_URL}login`;
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

export const postLoginServer = (accessToken) => {
    const url = `${ROOT_API_TOKUBUY}login/callback-server`;
    const data = {
        accessToken,
        deviceToken
    };
    return request.post(url, data);
}

export const postRegister = (
    username,
    email,
    password,
    confirm_password,
) => {
    const url = `${BASE_URL}register`;
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

export const getUserInfo = (accessToken) => {
    const url = `${ROOT_API_TOKUBUY}user/me`;
    return request.get(url, accessToken);
}
