if (process.env.NODE_ENV === 'production') {
  var ROOT_URL = 'http://docstash-server.herokuapp.com';
}else {
  ROOT_URL= 'http://localhost:3001';
}
export default ROOT_URL;
