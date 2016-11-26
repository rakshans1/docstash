function node() {
    if (process.env.NODE_ENV === 'production') {
        return true;
    } else {
        return false
    }
}
const ROOT_URL = node()
    ? '/api'
    : 'http://localhost:3001/api';
export const WS_URL = node()
    ? '/'
    : 'ws://localhost:3001';
export default ROOT_URL;
