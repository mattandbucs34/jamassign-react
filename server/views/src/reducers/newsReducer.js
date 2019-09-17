import { ADD_NEWS, GET_NEWS_VIEW } from '../actions/newsTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_NEWS:
    case GET_NEWS_VIEW:
      return action.payload;
    default:
      return state;
  }
}