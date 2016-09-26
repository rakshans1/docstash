import * as types from '../constants/actionTypes';
import ROOT_URL from '../baseurl';
import io from 'socket.io-client';

export function wsSuccess(data) {
    return {type: types.WEBSOCKET_SUCCESS, payload: data};
}

export default function ws(email) {
    return function(dispatch) {
        const socket = io(ROOT_URL);
        socket.emit('email', email);
        socket.on('onlineUsers', (onlineUsers) => {
            dispatch({type: types.WEBSOCKET_TOTAL_USER, payload: onlineUsers});
        });
        socket.on('data', (data) => {
            dispatch(wsSuccess(data));
        });
    }
}
