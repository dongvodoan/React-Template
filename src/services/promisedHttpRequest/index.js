// @flow weak
import {
    checkStatus,
    parseJSON,
    getNewRequestNoBody,
    getNewRequestHasBody
}                     from '../../helpers';

import {
    GET,
    PATCH,
    POST,
    PUT,
    DELETE
} from './methods';

const request = {
    get: (endpoint, token = null, headers = {}) => {
        let request = getNewRequestNoBody(endpoint, GET, token, headers);

        return fetch(request)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => data)
            .catch(error => error);
    },

    post: (endpoint, data, token = null, headers = {}) => {
        let request = getNewRequestHasBody(endpoint, POST, data, token, headers);

        return fetch(request)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => data)
            .catch(error => error);
    },

    put: (endpoint, data, token = null, headers = {}) => {
        let request = getNewRequestHasBody(endpoint, PUT, data, token, headers);

        return fetch(request)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => data)
            .catch(error => error);
    },

    delete: (endpoint, data, token = null, headers = {}) => {
        let request = getNewRequestHasBody(endpoint, DELETE, data, token, headers);

        return fetch(request)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => data)
            .catch(error => error);
    },

    patch: (endpoint, data, token = null, headers = {}) => {
        let request = getNewRequestHasBody(endpoint, PATCH, data, token, headers);

        return fetch(request)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => data)
            .catch(error => error);
    },
};

export default request;
