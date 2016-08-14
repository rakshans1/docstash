import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import {addNotification} from './notificationActions';

// const ROOT_URL = 'http://localhost:3001';
const ROOT_URL = 'http://docstash-server.herokuapp.com';

export function authSucess() {
  return {
    type: types.AUTH_USER_SUCCESS
  };
}

export function signinUser(email, password) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`,{email, password})
      .then(response => {
        dispatch(authSucess());
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(addNotification('Bad Login Info', 'error'));
      });
  };
}
export function signupUser( email, password ) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`,{email, password})
      .then(response => {
        dispatch(authSucess());
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(response =>  {
        dispatch(addNotification(response.response.data.error, 'error'));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: types.UNAUTH_USER_SUCCESS };
}
