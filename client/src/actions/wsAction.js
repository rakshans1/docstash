import * as types from '../constants/actionTypes';
import  {WS_URL} from '../baseurl';


export function wsSuccess(data) {
  return {
    type: types.WEBSOCKET_SUCCESS,
    payload: data
  };
}


export default function ws() {
  const ws = new WebSocket(WS_URL);
  return function(dispatch) {
    ws.onopen = () => {
      console.log("Connected");
    };
    ws.onmessage = (e) => {
      if (e.data === "ping") return;
      const data = JSON.parse(e.data);
      dispatch(wsSuccess(data));
    }
  }
}
