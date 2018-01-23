// @flow
import moment from 'moment';
import {
    ENTER_HOME_VIEW,
    ENTER_LOGIN_VIEW,
    ENTER_PAGE_NOT_FOUND_VIEW,
    ENTER_PROTECTED_VIEW,
    LEAVE_HOME_VIEW,
    LEAVE_LOGIN_VIEW,
    LEAVE_PAGE_NOT_FOUND_VIEW,
    LEAVE_PROTECTED_VIEW,
    ENTER_REGISTER_VIEW,
    LEAVE_REGISTER_VIEW,
} from "../constants/viewTypes";

export function enterHome(time: string = moment().format()) {
    return {
        type:         ENTER_HOME_VIEW,
        currentView:  'Home',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveHome(time: string = moment().format()) {
    return {
        type:         LEAVE_HOME_VIEW,
        currentView:  'Home',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterPageNotFound(time: string = moment().format()) {
    return {
        type:         ENTER_PAGE_NOT_FOUND_VIEW,
        currentView:  'PageNotFound',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leavePageNotFound(time: string = moment().format()) {
    return {
        type:         LEAVE_PAGE_NOT_FOUND_VIEW,
        currentView:  'PageNotFound',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterLogin(time: string = moment().format()) {
    return {
        type:         ENTER_LOGIN_VIEW,
        currentView:  'Login',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveLogin(time: string = moment().format()) {
    return {
        type:         LEAVE_LOGIN_VIEW,
        currentView:  'Login',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterRegister(time: string = moment().format()) {
  return {
    type:         ENTER_REGISTER_VIEW,
    currentView:  'Register',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveRegister(time: string = moment().format()) {
  return {
    type:         LEAVE_REGISTER_VIEW,
    currentView:  'Register',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterProtected(time: string = moment().format()) {
    return {
        type:         ENTER_PROTECTED_VIEW,
        currentView:  'Protected',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveProtected(time: string = moment().format()) {
    return {
        type:         LEAVE_PROTECTED_VIEW,
        currentView:  'Protected',
        enterTime:    null,
        leaveTime:    time
    };
}
