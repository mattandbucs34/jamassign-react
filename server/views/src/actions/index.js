import axios from 'axios';
import {
  ADD_NEWS,
  ADD_USER,
  DESTROY_ARTICLE,
  EDIT_ARTICLE,
  EDIT_PROFILE,
  FETCH_ALL_USER_NEWS,
  FETCH_PROFILE,
  FETCH_NEWS,
  FETCH_USER,
  SIGN_IN_USER,
  RESET_VIEWS,
  TRASH_ARTICLE,
  VIEW_ACCOUNT,
  VIEW_ADD_NEWS,
  VIEW_DASHBOARD,
  VIEW_EDIT_NEWS,
  VIEW_EDIT_PROFILE,
  VIEW_LIST,
  VIEW_NEWS_DASHBOARD,
} from './types';

//POST Actions
export const registerUser = (formValues, history) => async dispatch => {
  const res = await axios.post('/users/register', formValues.values);
  history.push('/dashboard');
  dispatch({ type: ADD_USER, payload: res.config.data });
};

export const createNews = (id, formValues, history) => async dispatch => {
  const res = await axios.post(`/news/${id}/add-news`, formValues.values);
  history.push('/articles')
  dispatch({ type: ADD_NEWS, payload: res.data });
}

export const editProfile = (profile, id) => async dispatch => {
  const res = await axios.post(`/profiles/${id}/edit`, profile);
  dispatch({ type: EDIT_PROFILE, payload: res.data });
}

export const editArticle = (article, articleId, id) => async dispatch => {
  const res = await axios.post(`/news/${id}/articles/${articleId}/edit`, article);
  dispatch({ type: EDIT_ARTICLE, payload: res.data });
}

export const trashArticle = (articleId, id) => async dispatch => {
  const res = await axios.post(`/news/${id}/articles/${articleId}/trash`);
  dispatch({ type: TRASH_ARTICLE, payload: res.data });
}

export const destroyArticle = (articleId, id) => async dispatch => {
  const res = await axios.post(`/news/${id}/articles/${articleId}/destroy`);
  dispatch({ type: DESTROY_ARTICLE, payload: res.data });
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
  const res = await axios.get('/news/show-news');
  dispatch({ type: FETCH_NEWS, payload: res.data })
}

export const fetchTrashNews = (id) => async dispatch => {
  const res = await axios.get(`/news/${id}/articles/trash`);
  console.log(res.data)
  dispatch({ type: FETCH_ALL_USER_NEWS, payload: res.data })
}

//Views Actions
export const viewAccount = (id) => async dispatch => {
  const res = await axios.get(`/profiles/${id}/profile`);
  dispatch({ type: VIEW_ACCOUNT, payload: res.data })
}

export const viewEditProfile = () => async dispatch => {
  const res = await axios.get('/profiles/edit');
  dispatch({ type: VIEW_EDIT_PROFILE, payload: res.data })
}

export const viewList = () => async dispatch => {
  const res = await axios.get('/profiles/show-list');
  dispatch({ type: VIEW_LIST, payload: res.data });
}

export const viewNewsDashboard = (id) => async dispatch => {
  const res = await axios.get(`/news/${id}/articles/dashboard`);
  dispatch({ type: VIEW_NEWS_DASHBOARD, payload: res.data})
}

export const viewAddNews = () => async dispatch => {
  const res = await axios.get('/news/add-news');
  dispatch({ type: VIEW_ADD_NEWS, payload: res.data });
}

export const viewDashboard = () => async dispatch => {
  const res = await axios.get('/users/dashboard');
  dispatch({ type: VIEW_DASHBOARD, payload: res.data })
}

export const viewEditNews = (id, articleId) => async dispatch => {
  const res = await axios.get(`/news/${id}/articles/${articleId}/edit`);
  dispatch({ type: VIEW_EDIT_NEWS, payload: res.data})
}

export const resetViews = () => async dispatch => {
  dispatch({ type: RESET_VIEWS, payload: null })
}