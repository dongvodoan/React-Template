// @flow weak
import {
  grant_type,
  client_id,
  client_secret,
  device,
  deviceToken,
} from '../../constants/common';
import request from '../promisedHttpRequest';
import openSocket from 'socket.io-client';

let BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_TOKUBUY;
let BASE_URL_PLATFORM = process.env.REACT_APP_ROOT_API_PLATFORM;

if (process.env.REACT_APP_ENV === 'staging') {
    BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_STG_TOKUBUY;
    BASE_URL_PLATFORM = process.env.REACT_APP_ROOT_API_STG_PLATFORM;
}

const socket = openSocket(BASE_URL_TOKUBUY);

export const postLoginPlatform = (username, password) => {
    const url = `${BASE_URL_PLATFORM}login`;
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
    const url = `${BASE_URL_TOKUBUY}login/callback-server`;
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
    const url = `${BASE_URL_PLATFORM}register`;
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
    const url = `${BASE_URL_TOKUBUY}user/me`;
    return request.get(url, accessToken);
};

export const sendMessage = message => {
    const url = `${BASE_URL_TOKUBUY}sendMessage`;
    return request.post(url, { message });
};

export const listenMessage = (callback) => {
    socket.on('message', message => callback(message));
};
