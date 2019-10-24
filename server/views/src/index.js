import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
import { loadState, saveState } from './localStorage';
window.axios = axios;

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(reduxThunk));

store.subscribe(() => {
  saveState({ user: store.getState().user });
});

axios.interceptors.request.use(
  config => {
    return config;
  },

  err => {
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  response => {
    return response
  }, 
  err => {
    if(err.response.status === 401) {
      return err.response;
    }else{
      return Promise.reject(err);
    }
  }
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.querySelector('#root')
);

