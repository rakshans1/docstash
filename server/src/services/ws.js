import socketio from 'socket.io';
let onlineUsers = 0;
let io;

let user = []; //  [ {email: , data:{} , sockets:[{}, {}] } ]
let userdata = {}; // object given by updater

exports.install = (server) => {
  io = socketio(server);
  io.on('connection' , (socket) => {
    io.emit('onlineUsers',{ onlineUsers: ++onlineUsers })
    // initializeConnection(socket);
    handleEmail(socket);
    handleClientDisconnections(socket);
  });
}

// function initializeConnection(socket){
//   return
// }

function handleEmail (socket) {  //Add new connections to user array if user exists see for his data and update
  socket.on('email', (email) => {
    let existingUser = user.find(user => user.email === email);
    if (existingUser) return updateUser([existingUser.email], userdata.torrents, socket);
    user.push({email: email,  data: {} , sockets: [  socket ]  });
  });
}


function handleClientDisconnections(socket){  //delete user socket from array of sockets
  socket.on('disconnect', function(){
   io.emit('onlineUsers',{ onlineUsers: --onlineUsers })
   deleteSocket(socket);
 });
}

function sendUpdate(emails) {
  emails.forEach((email) => {
    const usr = user.find(usr => usr.email === email);
    usr.sockets.forEach((socket) => {
      socket.emit('data', usr.data);
    })
  });
}

function socketHeartBeat( ) {
  user.forEach(usr => {
    usr.sockets.forEach((socket) => {
      socket.emit('data', usr.data);
    })
  });
}

function deleteSocket (socket) {
  user.forEach(usr => {
    usr.sockets.forEach((sock, index, object) => {
      if (sock.id === socket.id) object.splice(index, 1);
    })
  });
}

exports.send = (data) => { // Updater sends updates here
  let json = JSON.stringify(data, (k, v) => {
    return typeof k === "string" && k[0] === "$" ? undefined : v;
  }, 2);
  let j = JSON.parse(json);
  userdata = j;
  sortByEmail(userdata.torrents);
}

function sortByEmail(array) {
	//array should have array.email  property
	var uniqueemail = [];
  // eslint-disable-next-line
	array.map((item) => {
		const i = uniqueemail.find(email => email === item.email);
		if (i === undefined) uniqueemail.push(item.email);
	});
	updateUser(uniqueemail, array);
}

function updateUser(emails, array, socket) {
	emails.forEach((email) => {
		const usr = user.find(user => user.email === email);
		if (!usr) return socketHeartBeat();
		if (array ) {
      var tor = array.filter(array => array.email === email);
		usr.data.torrents = tor;
    usr.data.filesDownloading = tor.length;
    }
    if (socket) usr.sockets.push(socket);
	});
  sendUpdate(emails);
}
