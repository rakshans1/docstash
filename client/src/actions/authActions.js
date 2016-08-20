import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import {addNotification} from './notificationActions';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';

const ROOT_URL = 'http://localhost:3001';
// const ROOT_URL = 'http://docstash-server.herokuapp.com';

export function authSucess() {
  return {
    type: types.AUTH_USER_SUCCESS
  };
}

export function signinUser(email, password) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/signin`,{email, password})
      .then(response => {
        dispatch(authSucess());
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(ajaxCallError());
        dispatch(addNotification('Bad Login Info', 'error'));
      });
  };
}
export function signupUser(name,  email, password ) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/signup`,{name, email, password})
      .then(response => {
        dispatch(authSucess());
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(response =>  {
        dispatch(ajaxCallError());
        dispatch(addNotification(response.response.data.error, 'error'));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: types.UNAUTH_USER_SUCCESS };
}
