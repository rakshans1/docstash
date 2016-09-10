import socketio from 'socket.io';
let onlineUsers = 0;
let io;

let user = [];
let userdata = {};

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

function handleEmail (socket) {
  socket.on('email', (email) => {
    let existingUser = user.find(user => user.email === email);
    if (existingUser) return updateUser([existingUser.email], userdata.torrents, user, socket);
    user.push({email: email,  data: {} , sockets: [  socket ]  });
  });
}


function handleClientDisconnections(socket){
  socket.on('disconnect', function(){
   io.emit('onlineUsers',{ onlineUsers: --onlineUsers })
 });
}

function sendUpdate(emails) {
  emails.forEach((email) => {
    const usr = user.find(user => user.email === email);
    usr.sockets.forEach((socket) => {
      socket.emit('data', usr.data);
    })
  });
}


exports.send = (data) => {
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
	updateUser(uniqueemail, array, user);
}

function updateUser(emails, array, user, socket) {
	emails.forEach((email) => {
		const usr = user.find(user => user.email === email);
		if (!usr) return;
		if (array ) {
      var tor = array.filter(array => array.email === email);
		usr.data.torrents = tor;
    }
    if (socket) usr.sockets.push(socket);
	});
  sendUpdate(emails);
}
