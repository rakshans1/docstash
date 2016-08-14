import * as types from '../constants/actionTypes';

export default function(state = { authenticated: false }, action) {
  switch(action.type) {
    case types.AUTH_USER_SUCCESS:
      return { ...state, error: '', authenticated: true };
    case types.UNAUTH_USER_SUCCESS:
      return { ...state, authenticated: false };
    case types.FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }
  return state;
}
