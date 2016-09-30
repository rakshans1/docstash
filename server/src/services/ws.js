import socketio from 'socket.io';
import User from '../models/user';

let onlineUsers = 0;
let io;
let downloadList = [];
let user = []; //  [ {email: , data:{} , sockets:[{}, {}] } ]
let userdata = {}; // object given by updater



exports.install = (server) => {
    io = socketio(server);
    io.on('connection', (socket) => {
        io.emit('onlineUsers', {
            onlineUsers: ++onlineUsers
        })
        // initializeConnection(socket);
        handleEmail(socket);
        handleClientDisconnections(socket);
        handleMessage(socket);
    });
}

function addUser(email, socket, done) {
    User.findOne({
      email: email
    }, (err, existingUser) => {
      if (err) return
        user.push({email: existingUser.email, pic: existingUser.picture, name: existingUser.name, data: {}, sockets: [socket] })
        done(null, user);
    });
}

function handleEmail(socket) { //Add new connections to user array if user exists see for his data and update
    socket.on('email', (email) => {
        let existingUser = user.find(user => user.email === email);
        if (existingUser)
            return updateUser([existingUser.email], userdata.torrents, socket);
        addUser(email ,socket, sendUpdate);
    });
}

function handleClientDisconnections(socket) { //delete user socket from array of sockets
    socket.on('disconnect', function() {
        io.emit('onlineUsers', {
            onlineUsers: --onlineUsers
        })
        deleteSocket(socket);
    });
}
function handleMessage(socket) {
  socket.on('message', (senderEmail, recieverEmail, message) => {
      updateChat(senderEmail, recieverEmail, message);
  });

}

function sendUpdate(emails) {
  let chatUser = [];
  if (emails === null){
    emails = []
    chatUser = []
   user.forEach(usr => {
     if (usr.sockets.length > 0) {
       emails.push(usr.email);
       chatUser.push({name: usr.name, pic: usr.pic, email: usr.email});
     }
   })
 } else {
   chatUser = []
  user.forEach(usr => {
    if (usr.sockets.length > 0) {
      chatUser.push({name: usr.name, pic: usr.pic, email: usr.email});
    }
  })
 }

  emails.forEach((email) => {
      const usr = user.find(usr => usr.email === email);
      usr.sockets.forEach((socket) => {
          socket.emit('data', Object.assign({}, usr.data, {
              onlineUsers: onlineUsers
          }, {
              uploads: userdata.uploads
          }, {twitter: userdata.twitter
          },{chat: {
            user: chatUser
          } }));
      })
  });
}

function deleteSocket(socket) {
    user.forEach(usr => {
        usr.sockets.forEach((sock, index, object) => {
            if (sock.id === socket.id)
                object.splice(index, 1);
            }
        )
    });
    sendUpdate(null);
}

exports.send = (data) => { // Updater sends updates here
    let json = JSON.stringify(data, (k, v) => {
        return typeof k === "string" && k[0] === "$"
            ? undefined
            : v;
    }, 2);
    let j = JSON.parse(json);
    userdata = j;

    if (userdata.twitter.count > 0 && user.length > 0)
        sendUpdate(user.map(usr => {
            return usr.email
        }));
    sortByEmail(userdata.torrents);
}

function sortByEmail(array) {
    //array should have array.email  property
    var uniqueemail = [];
    // eslint-disable-next-line
    array.map((item) => {
        const i = uniqueemail.find(email => email === item.email);
        if (i === undefined)
            uniqueemail.push(item.email);
        }
    );
    updateUser(uniqueemail, array);
}

function updateUser(emails, array, socket) {
    emails.forEach((email) => {
        const usr = user.find(user => user.email === email);
        if (!usr)
            return
        if (array) {
            var tor = array.filter(array => array.email === email);
            usr.data.torrents = tor;
            usr.data.filesDownloading = tor.length;
        }
        if (socket)
            usr.sockets.push(socket);
        }
    );
    sendUpdate(null);
    let difference = downloadList.filter(x => emails.indexOf(x) === -1); //difference between previous update list and now
    if (difference.length > 0)
        nodownload(difference);
    downloadList = emails;
}

function nodownload(emails) {
    emails.forEach((email) => {
        const usr = user.find(user => user.email === email);
        if (!usr)
            return
        usr.data.torrents = [];
        usr.data.filesDownloading = 0;
    });
    sendUpdate(emails);
}


function updateChat(senderEmail, recieverEmail, message) {
  //get sender from user array
  const sender = user.find(usr => usr.email === senderEmail);
  //get reciever from user array
  const reciever = user.find(usr => usr.email === recieverEmail);

  if (sender.data.chats) {
    //get reciever array in senders data    {data: chat: [{email:  ,  messages: [{1: message }]   }  ]  , [    ]  }
    const senderRArray = sender.data.chats.find(sendr => sendr.email === recieverEmail);
    senderRArray.messages.push({1: message});
  } else {
    sender.data.chats = []
    sender.data.chats.push({email: recieverEmail, messages: [  {1: message} ] });
  }

  if (reciever.data.chats) {
    //get reciever array in senders data    {data: chat: [{email:  ,  messages: [{2: message }]   }  ]  , [    ]  }
    const recieverSArray = reciever.data.chats.find(recvr => recvr.email === senderEmail );
    recieverSArray.messages.push({2: message});
  } else {
    reciever.data.chats = []
    reciever.data.chats.push({email: senderEmail, messages: [ {2: message} ] });
  }
  sendUpdate([senderEmail, recieverEmail]);

}
