import axios from 'axios';
import {
  ADD_NEWS,
  ADD_USER,
  EDIT_PROFILE,
  FETCH_USER,
  FETCH_NEWS,
  SIGN_IN_USER,
  RESET_VIEWS,
  VIEW_ACCOUNT,
  VIEW_ADD_NEWS,
  VIEW_DASHBOARD,
  VIEW_EDIT_PROFILE,
  VIEW_LIST,
  FETCH_PROFILE
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

export const editProfile = (profile, id) => async dispatch => {
  const res = await axios.post(`/profiles/${id}/edit`, profile);
  console.log(res.data)
  dispatch({ type: EDIT_PROFILE, payload: res.data })
}

//Fetch Actions

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/users/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserProfile = () => async dispatch => {
  const res = await axios.get('/profiles/get');
  dispatch({ type: FETCH_PROFILE, payload: res.data });
}


export const signInUser = (formValues) => async dispatch => {
  const res = await axios.post('/users/sign_in', formValues.values);
  dispatch({ type: SIGN_IN_USER, payload: res.data });
};

export const fetchNews = () => async dispatch => {
  const news = await axios.get('/news/show-news');
  dispatch({ type: FETCH_NEWS, payload: news.data })
}

//Views Actions
export const viewAccount = (id) => async dispatch => {
  const account = await axios.get(`/profiles/${id}/profile`);
  dispatch({ type: VIEW_ACCOUNT, payload: account.data })
}

export const viewEditProfile = () => async dispatch => {
  const res = await axios.get('/profiles/edit');
  dispatch({ type: VIEW_EDIT_PROFILE, payload: res.data })
}

export const viewList = () => async dispatch => {
  const res = await axios.get('/profiles/show-list');
  dispatch({ type: VIEW_LIST, payload: res.data });
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