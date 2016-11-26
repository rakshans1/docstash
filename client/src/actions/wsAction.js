import * as types from '../constants/actionTypes';
import {WS_URL} from '../baseurl';
import io from 'socket.io-client';
const socket = io(WS_URL);

export function wsSuccess(data) {
    return {type: types.WEBSOCKET_SUCCESS, payload: data};
}

export function wsChat(senderEmail, receiverEmail, message) {
  return function(dispatch) {
    socket.emit('message', senderEmail, receiverEmail, message);
  }
}

export default function ws(email) {
    return function(dispatch) {
        socket.emit('email', email);
        socket.on('onlineUsers', (onlineUsers) => {
            dispatch({type: types.WEBSOCKET_TOTAL_USER, payload: onlineUsers});
        });
        socket.on('data', (data) => {
            dispatch(wsSuccess(data));
        });
    }
}
