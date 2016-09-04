//this is a generic backend
//when required it chooses from list of defined
//backend based on present envirenment variables

import secret from '../config/secret';
import fs from 'fs';

//list all backends
const backends = fs.readdirSync(__dirname+"/backends").filter((js) => {
  return js !==  (/\.js$/).test(js);
});

//exit helper
function exit(msg) {
  console.log(msg);
}


let matched = false;

//load this first viable backend
backends.forEach((name) => {
  name = name.substr(0, name.lastIndexOf('.')) || name;
  if (matched) return;
  var backend = require("./backends/"+name);
  const vars = backend.vars;

  if (!backend.init) exit("Backend " + name + " missing 'vars' array");
  const config = secret[name];
  const vals = vars.map((v) => {
    const val = config[v];

    if (!val) backend = null;
    return val;
  });

  if (!backend) return; //continue

  //backend has been chosen by env vars,
	//now check its validity
  backend.name = name;

  if (!backend.init) exit("Backend " + name + " missing 'init(env vars...)' function");
  backend.init(vals);

  if(typeof backend.upload !== "function")
		exit("Backend " + name + " missing 'upload(torrent file, callback)' function");

	if(typeof backend.remove !== "function")
		exit("Backend " + name + " missing 'remove(path, callback)' function");

	if(typeof backend.list !== "function")
		exit("Backend " + name + " missing 'list(callback)' function");

  //backend ready!
	module.exports = backend;
	matched = true;
});

if(!matched)
	exit("No backend match. "+
		"Environment variables missing for: " +
		backends.join(", "));
