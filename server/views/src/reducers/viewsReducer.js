import {
  VIEW_ACCOUNT,
  VIEW_ADD_NEWS,
  RESET_VIEWS,
  VIEW_DASHBOARD,
  VIEW_EDIT_PROFILE,
  VIEW_LIST
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case VIEW_ACCOUNT:
    case VIEW_ADD_NEWS:
    case VIEW_DASHBOARD:
    case VIEW_EDIT_PROFILE:
    case VIEW_LIST:
      return action.payload;
    case RESET_VIEWS:
    default:
      return state;
  }
}