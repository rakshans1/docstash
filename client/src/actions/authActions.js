import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import {addNotification} from './notificationActions';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {userInfo} from './userActions';
import  ROOT_URL from '../baseurl';

export function authSucess(token) {
  return {
    type: types.AUTH_USER_SUCCESS,
    payload: token
  };
}

export function signinUser(email, password) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/signin`,{email, password})
      .then(response => {
        dispatch(authSucess(response.data.token));
        dispatch(userInfo(response.data.token));
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
        dispatch(authSucess(response.data.token));
        dispatch(userInfo(response.data.token));
        browserHistory.push('/');
      })
      .catch(response =>  {
        dispatch(ajaxCallError());
        dispatch(addNotification(response.response.data.error, 'error'));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('Docstash');
  browserHistory.push('/');
  return { type: types.UNAUTH_USER_SUCCESS };
}

export function googleLogin(token) {
    return function(dispatch) {
      dispatch(authSucess(token));
      dispatch(userInfo(token));
      browserHistory.push('/');
    };
}

export function resetPassword(email) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/resetpassword`, {email})
      .then(response => {
        dispatch(addNotification('New Password is sent through Email', 'success'));
        dispatch(ajaxCallError());
      })
      .catch(response => {
        dispatch(ajaxCallError());
        dispatch(addNotification(response.response.data.error, 'error'));
      });
  };
}
