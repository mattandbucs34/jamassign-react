import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import newsReducer from './newsReducer';
import profileReducer from './profileReducer';
import sitesReducer from './sitesReducer';
import userReducer from './userReducer';
import viewsReducer from './viewsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  news: newsReducer,
  profile: profileReducer,
  sites: sitesReducer,
  user: userReducer,
  views: viewsReducer
});