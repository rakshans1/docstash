import {SHOW_MODAL, HIDE_MODAL} from '../constants/actionTypes';

export function showModal() {
    return {type: SHOW_MODAL};
}

export function hideModal() {
    return {type: HIDE_MODAL};
}
