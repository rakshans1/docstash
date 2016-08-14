import * as types from '../constants/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSucess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.pendingTask, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSucess(action.type)) {
     if (state > 0)  {
       return state - 1;
     }
     return state;
  }

  return state;
}
