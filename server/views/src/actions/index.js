import axios from 'axios';
import { ADD_USER, FETCH_USER, SIGN_IN_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/users/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const registerUser = (formValues, history) => async dispatch => {
  const res = await axios.post('/users/register', formValues.values);
  history.push('/');
  dispatch({ type: ADD_USER, payload: res.config.data });
};

export const signInUser = (formValues, history) => async dispatch => {
  const res = await axios.post('/users/sign_in', formValues.values);
  history.push('/dashboard');
  dispatch({ type: SIGN_IN_USER, payload: res.data });
}