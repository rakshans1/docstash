import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';


const ROOT_URL = 'http://localhost:3001';

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
        dispatch(authError('Bad Login Info'));
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
        dispatch(authError(response.response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: types.UNAUTH_USER_SUCCESS };
}
