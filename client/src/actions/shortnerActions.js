import axios from 'axios';
import { ADD_SHORTNER_SUCCESS } from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import  ROOT_URL from '../baseurl';


export function shortnerSucess(url) {
  return {
    type: ADD_SHORTNER_SUCCESS,
    payload: url
  };
}

export function addShortner(url) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/short`,{url})
      .then(response => {
        dispatch(shortnerSucess(response.data));
      })
      .catch(() => {
        dispatch(ajaxCallError());
        dispatch(addNotification('Shortner Error', 'error'));
      });
  };
}
