import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  profile: profileReducer,
  user: userReducer
});