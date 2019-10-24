import { 
  ADD_USER,
  FETCH_USER,
  SIGN_IN_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_USER:
    case FETCH_USER:
      return action.payload;
    case SIGN_IN_USER:
      return action.payload;
    default:
      return state;
  }
}