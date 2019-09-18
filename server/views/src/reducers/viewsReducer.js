import {
  VIEW_ACCOUNT,
  VIEW_ADD_NEWS,
  RESET_VIEWS,
  VIEW_DASHBOARD
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case VIEW_ACCOUNT:
    case VIEW_ADD_NEWS:
    case VIEW_DASHBOARD:
      return action.payload;
    case RESET_VIEWS:
    default:
      return state;
  }
}