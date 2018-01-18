// @flow weak
export const getLocationOrigin = () => {
    if (!window.location.origin) {
        window.location.origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
    }
    return window.location.origin;
};

export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 500) {
        return response;
    } else {
        const error: any = new Error(response.statusText);
        error.response = response;
        // throw error;
        return Promise.reject(error);
    }
};

export const parseJSON = (response) => {
    return response.json();
};

export const getNewRequestNoBody = (url: string, method: string, token = null, headers = {}) => {
    let originHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
    };
    let customHeaders = Object.assign(headers, originHeaders);
    const request = new Request(url, {
        method,
        headers: customHeaders
    });
    return request;
};

export const getNewRequestHasBody = (url: string, method: string, data: any, token = null, headers = {}) => {
    let originHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
    };
    let customHeaders = Object.assign(headers, originHeaders);
    const request = new Request(url, {
        method,
        headers: customHeaders,
        body: JSON.stringify(data)
    });
    return request;
};
