import axios from 'axios';
import { ADD_NEWS, GET_NEWS_VIEW } from './newsTypes';

export const viewAddNews = () => async dispatch => {
  const res = await axios.get('/news/add-news');
  dispatch({ type: GET_NEWS_VIEW, payload: res.data });
}

export const createNews = (formValues) => async dispatch => {
  const res = await axios.post('/news/add-news', formValues.values);
  dispatch({ type: ADD_NEWS, payload: res.data });
}


