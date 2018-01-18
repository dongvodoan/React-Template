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

export const postLogin = (email, password) => {
    const url = `${BASE_URL}login`;
    const data = {
        email,
        password
    };
    return request.post(url, data);
};
