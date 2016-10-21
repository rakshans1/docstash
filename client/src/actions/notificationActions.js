import {ADD_NOTIFICATION} from '../constants/actionTypes';

export function addNotification(message, level) {
    return {type: ADD_NOTIFICATION, message, level};
}
