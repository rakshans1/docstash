import { ADD_NOTIFICATION } from '../constants/actionTypes';

export default function notification(state = {}, action) {
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
