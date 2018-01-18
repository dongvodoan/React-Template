// @flow weak
import {
    ENTER_LOGIN_VIEW,
    LEAVE_HOME_VIEW,
    ENTER_HOME_VIEW,
    LEAVE_LOGIN_VIEW,
    ENTER_PAGE_NOT_FOUND_VIEW,
    LEAVE_PAGE_NOT_FOUND_VIEW,
    ENTER_PROTECTED_VIEW,
    LEAVE_PROTECTED_VIEW
} from '../constants/viewTypes';

const initialState = {
  currentView:  'home',
  enterTime:    null,
  leaveTime:    null
};

export default function views(state: Object = initialState, action: Object) {
  switch (action.type) {
    case ENTER_PAGE_NOT_FOUND_VIEW:
    case ENTER_PROTECTED_VIEW:
    case ENTER_HOME_VIEW:
    case ENTER_LOGIN_VIEW:
      // can't enter if you are already inside
      if (state.currentView !== action.currentView) {
        return {
          ...state,
          currentView:  action.currentView,
          enterTime:    action.enterTime,
          leaveTime:    action.leaveTime
        };
      }
      return state;
    case LEAVE_PROTECTED_VIEW:
    case LEAVE_PAGE_NOT_FOUND_VIEW:
    case LEAVE_HOME_VIEW:
    case LEAVE_LOGIN_VIEW:
      // can't leave if you aren't already inside
      if (state.currentView === action.currentView) {
        return {
          ...state,
          currentView:  action.currentView,
          enterTime:    action.enterTime,
          leaveTime:    action.leaveTime
        };
      }
      return state;

    default:
      return state;
  }
}
