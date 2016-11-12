import {SHOW_MODAL, HIDE_MODAL} from '../constants/actionTypes';

export function showModal(modal, payload) {
    return {type: SHOW_MODAL, modal: modal, payload: payload };
}

export function hideModal() {
    return {type: HIDE_MODAL};
}
