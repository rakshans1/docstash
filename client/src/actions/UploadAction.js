import {UPLOAD} from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import ROOT_URL from '../baseurl';
import axios from 'axios';

export function upload(data, config) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/upload`, data, config)
    .then(res => {
      dispatch(ajaxCallError());
      console.log(res.data)
    })
    .catch(err => {
      dispatch(ajaxCallError());
      console.log(err);
    });
  }
}
