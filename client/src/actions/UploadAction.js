import {UPLOAD} from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import updateInfo from './updateInfo';
import ROOT_URL from '../baseurl';
import axios from 'axios';

export function upload(data, config, token) {
  return function(dispatch) {
      dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/upload`, data, config)
    .then(res => {
      dispatch(ajaxCallError());
      dispatch(updateInfo(token));
    })
    .catch(err => {
      dispatch(ajaxCallError());
      console.log(err);
    });
  }
}
