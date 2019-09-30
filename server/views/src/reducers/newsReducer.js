import {
  ADD_NEWS,
  EDIT_ARTICLE,
  FETCH_ALL_USER_NEWS,
  FETCH_NEWS,
  TRASH_ARTICLE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_NEWS:
    case EDIT_ARTICLE:
    case FETCH_ALL_USER_NEWS:
    case FETCH_NEWS:
    case TRASH_ARTICLE:
      return action.payload;
    default:
      return state;
  }
}