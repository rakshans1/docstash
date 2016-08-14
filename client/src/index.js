/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
require('./assets/favicon.png');
import './assets/styles/main.sass';
import './assets/icon/flaticon.css';
import { syncHistoryWithStore } from 'react-router-redux';
import { AUTH_USER_SUCCESS } from './constants/actionTypes';

import App from './components/App';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER_SUCCESS });
}

render(
  <Provider store={store}>
   <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('app')
);
