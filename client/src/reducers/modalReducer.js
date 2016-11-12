import * as types from '../constants/actionTypes';
import initialState from './initialState';

function modal(state = initialState.modal, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
          return Object.assign({}, state, {
              status: true,
              modal: action.modal,
              payload: action.payload
          });
        case types.HIDE_MODAL:
          return Object.assign({}, state, {
              status: false,
              modal: "upload",
              payload: ''
          });
        default:
            return state
    }
}

export default modal;
