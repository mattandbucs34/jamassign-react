import {
  ADD_NEWS,
  FETCH_NEWS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_NEWS:
    case FETCH_NEWS:
      return action.payload;
    default:
      return state;
  }
}