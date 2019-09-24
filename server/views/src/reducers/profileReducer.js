import { EDIT_PROFILE, FETCH_PROFILE } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case EDIT_PROFILE:
    case FETCH_PROFILE:
      return action.payload;
    default:
      return state;
  }
}