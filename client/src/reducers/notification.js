import { ADD_NOTIFICATION } from '../constants/actionTypes';
import initialState from './initialState';


export default function notification(state = initialState.notification, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level
      });
    default:
        return state;
  }
}
