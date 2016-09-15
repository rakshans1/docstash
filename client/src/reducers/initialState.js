export default  {
  pendingTask: 0,
  notification: {
    message: null,
    level: null
  },
  auth:{
    authenticated: false,
    token: '',
  },
  modal: false,
  user:{
    name: '',
    email: '',
    picture: '',
  },
  shortner: '',
  torrent: {
    search: []
  },
  ws: {
    torrents: '',
    onlineUsers: 0
  }
};
