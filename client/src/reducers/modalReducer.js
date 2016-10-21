import * as types from '../constants/actionTypes';
import initialState from './initialState';

function modal(state = initialState.modal, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
            return true
        case types.HIDE_MODAL:
            return false
        default:
            return state
    }
}

export default modal;
