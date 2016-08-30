// eslint-disable no-undef
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state =  initialState.authenticated, action) {
  switch(action.type) {
    case types.AUTH_USER_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
      });
      // return { ...state, error: '', authenticated: true };
    case types.UNAUTH_USER_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
      });
      // return { ...state, authenticated: false };
    // case types.FETCH_MESSAGE:
    //   return Object.assign({}, state, {
    //     message: action.payload,
    //   });
      // return { ...state, message: action.payload };
    default:
        return state;
  }
}
