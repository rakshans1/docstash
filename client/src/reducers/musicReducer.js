import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.music, action) {
  if (action.type === types.MUSIC) {
    return Object.assign({}, state, {
        url: action.payload,
        status: "play"
    });
  } else {
    return state;
  }
}
