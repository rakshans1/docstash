import { ADD_SHORTNER_SUCCESS } from '../constants/actionTypes';
import initialState from './initialState';

export default function shortner(state = initialState.shortner, action) {
  switch (action.type) {
    case ADD_SHORTNER_SUCCESS:
    return Object.assign({}, state, {
      shortner: action.payload,
    });
    default:
        return state;
  }
}
