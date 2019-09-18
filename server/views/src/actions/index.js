import axios from 'axios';
import {
  ADD_NEWS,
  ADD_USER,
  FETCH_USER,
  FETCH_NEWS,
  GET_PROFILE_LIST,
  SIGN_IN_USER,
  RESET_VIEWS,
  VIEW_ACCOUNT,
  VIEW_ADD_NEWS,
  VIEW_DASHBOARD
} from './types';

//Creation Actions
export const registerUser = (formValues, history) => async dispatch => {
  const res = await axios.post('/users/register', formValues.values);
  history.push('/dashboard');
  dispatch({ type: ADD_USER, payload: res.config.data });
};

export const createNews = (formValues) => async dispatch => {
  const res = await axios.post('/news/add-news', formValues.values);
  dispatch({ type: ADD_NEWS, payload: res.data });
}

//Fetch Actions

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/users/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signInUser = (formValues) => async dispatch => {
  const res = await axios.post('/users/sign_in', formValues.values);
  dispatch({ type: SIGN_IN_USER, payload: res.data });
};

export const fetchProfiles = () => async dispatch => {
  const res = await axios.get('/profiles/list-of-officials');
  dispatch({ type: GET_PROFILE_LIST, payload: res.data });
}

export const fetchNews = () => async dispatch => {
  const news = await axios.get('/news/show-news');
  dispatch({ type: FETCH_NEWS, payload: news.data })
}

//Views Actions
export const viewAccount = () => async dispatch => {
  const account = await axios.get('/profiles/account');
  console.log(account.data);
  dispatch({ type: VIEW_ACCOUNT, payload: account.data })
}

export const viewAddNews = () => async dispatch => {
  const view = await axios.get('/news/add-news');
  dispatch({ type: VIEW_ADD_NEWS, payload: view.data });
}

export const viewDashboard = () => async dispatch => {
  const view = await axios.get('/users/dashboard');
  dispatch({ type: VIEW_DASHBOARD, payload: view.data })
}

export const resetViews = () => async dispatch => {
  dispatch({ type: RESET_VIEWS, payload: null })
}