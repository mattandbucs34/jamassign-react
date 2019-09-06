import { GET_PROFILE_LIST } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case GET_PROFILE_LIST:
      return action.payload;
    default:
      return state;
  }
}