function node() {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }else {
    return false
  }
}
const ROOT_URL = node() ? 'http://docstash-server.herokuapp.com' : 'http://d.co';
export const WS_URL = node() ? 'ws://docstash-server.herokuapp.com' : 'ws://d.co';
export default ROOT_URL;
