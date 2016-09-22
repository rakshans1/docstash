import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxstatusActions';
import {addNotification} from './notificationActions';
import  ROOT_URL from '../baseurl';

export function addTwitter(phrase) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    axios.post(`${ROOT_URL}/twitter`,{tweet: phrase})
      .then(response => {
        dispatch(ajaxCallError());
        dispatch(addNotification('Tweet Streaming', 'success'));
      })
      .catch((err) => {
        dispatch(ajaxCallError());
        dispatch(addNotification(err, 'error'));
      });
  };
}
