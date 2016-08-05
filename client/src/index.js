/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import './assets/styles/main.sass';
import './assets/icon/flaticon.css';
import '../node_modules/nprogress/nprogress.css';
import '../node_modules/toastr/build/toastr.min.css';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App';

const store = configureStore();

render(
  <Provider store={store}>
   <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);
