// eslint-disable no-undef
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state =  initialState.auth, action) {
  switch(action.type) {
    case types.AUTH_USER_SUCCESS:
      return Object.assign({}, state, {
           authenticated: true, token: action.payload
      });

    case types.UNAUTH_USER_SUCCESS:
    return Object.assign({}, state, {
         authenticated: false, token: ''
    });
    default:
        return state;
  }
}
