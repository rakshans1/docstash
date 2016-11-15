export default {
    pendingTask : 0,
    notification : {
        message: null,
        level: null
    },
    auth : {
        authenticated: false,
        token: ''
    },
    modal : {
      status: false,
      modal: 'upload',
      payload: ''
    },
    user : {
        name: '',
        email: '',
        picture: '',
        storage: 0,
    },
    shortner : {
        shortner: null,
        input: ''
    },
    weather: [],
    torrent : {
        search: [],
        input: ''
    },
    ws : {
        torrents: '',
        onlineUsers: 0,
        filesDownloading: 0,
        uploads: '',
        chats: []
    },
    file: [],
    folder: [],
    recent: [],
    subfile: [],
    subfolder: [],
    filefilter: [],
    search: {
      status: false,
      payload: []
    }
};
