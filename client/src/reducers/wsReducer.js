import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function ws(state = initialState.ws, action) {
  switch (action.type) {
    case types.WEBSOCKET_SUCCESS:
    return action.payload;
    default:
        return state;
  }
}
