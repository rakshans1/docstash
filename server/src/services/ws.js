import WebSocket from 'ws';

let json = "";
let data = null;
let conns = [];
let THROTTLE = 100;
let queued = false;

// send keeplive pings
setInterval(() => {
  conns.forEach((conn) => {
    conn.ssend("ping");
  });
}, 30 * 1000);

exports.install = function(server) {
  const ws = new WebSocket.Server( {server: server});

  //this is required to allow the error to fall
  //through to the http server
  ws.on("error", () => {});

  ws.on('connection' , (conn) => {
    //safe send
    conn.ssend = function(str) {
      if (this.readyState === WebSocket.OPEN) this.send(str);
    };
    //track all connections
    conns.push(conn);
    conn.on('close', () => {
      let i = conns.indexOf(conn);
      if (i >= 0) conns.splice(i, 1);
    });

    //noop (dont buffer data)
    conn.on('data', () => {});

    //initially sends the last broadcast
    if (json) conn.ssend(json);
  });
};


function broadcast() {
  queued = false;
  //dont include $properties
  json = JSON.stringify(data, (k, v) => {
    return typeof k === "string" && k[0] === "$" ? undefined : v;
  }, 2);
  conns.forEach((conn) => {
    conn.ssend(json);
  });
}

//just throttles to the private 'broadcast' function
exports.broadcast = function(d) {
  data = d; //always use latest broadcast
  if (queued) return;
  queued = true;
  setTimeout(broadcast, THROTTLE);
}
