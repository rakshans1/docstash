import axios from 'axios';
import {SEARCHOPEN, SEARCHCLOSE} from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import _ from '../utils/lobash';
import ROOT_URL from '../baseurl';

export function searchOpen(query, token) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
      axios.get(`${ROOT_URL}/searchFile/${query}`, {
          headers: {
              authorization: token
          }
      }).then(response => {
          dispatch(ajaxCallError());
          dispatch({type: SEARCHOPEN, payload: response.data});
      }).catch(reponse => {
          dispatch(ajaxCallError());
      });
  }
}

export function searchClose() {
    return {type: SEARCHCLOSE};
}
