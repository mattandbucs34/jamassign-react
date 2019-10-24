import {
  ADD_SITE,
  DESTROY_SITE,
  EDIT_SITE,
  FETCH_ALL_SITES
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type){
    case ADD_SITE:
    case DESTROY_SITE:
    case EDIT_SITE:
    case FETCH_ALL_SITES:
      return action.payload;
    default:
      return state;
  }
}