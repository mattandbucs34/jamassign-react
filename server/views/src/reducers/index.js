import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  user: userReducer
});