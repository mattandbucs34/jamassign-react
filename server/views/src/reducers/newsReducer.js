import {
  ADD_NEWS,
  DESTROY_ARTICLE,
  EDIT_ARTICLE,
  FETCH_ALL_USER_NEWS,
  FETCH_NEWS,
  TRASH_ARTICLE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_NEWS:
    case DESTROY_ARTICLE:
    case EDIT_ARTICLE:
    case FETCH_ALL_USER_NEWS:
    case FETCH_NEWS:
    case TRASH_ARTICLE:
      return action.payload;
    default:
      return state;
  }
}