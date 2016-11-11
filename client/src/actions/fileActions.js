import axios from 'axios';
import {FILE} from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import ROOT_URL from '../baseurl';

export function files(token) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        axios.get(`${ROOT_URL}/files`, {
            headers: {
                authorization: token
            }
        }).then(response => {
            dispatch(ajaxCallError());
            dispatch({type: FILE, payload: response.data});
        }).catch(reponse => {
            dispatch(ajaxCallError());
        });
    }
}
