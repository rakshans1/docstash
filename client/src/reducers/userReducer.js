import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.user , action) {
  switch(action.type) {
    case types.USERS_INFO_SUCCESS:
      return action.payload
    default:
        return state;
  }
}
