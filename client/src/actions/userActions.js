import axios from 'axios';
import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import ws from './wsAction'
import ROOT_URL from '../baseurl';

export function userInfo(token) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/user`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch({type: types.USERS_INFO_SUCCESS, payload: response.data});
            dispatch(ws(response.data.email));
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}
