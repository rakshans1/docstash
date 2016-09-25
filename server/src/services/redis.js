import { createClient } from 'then-redis'

const db = createClient()


export const init = () => {
  db.flushdb();
  db.mset({
    onlineUsers: 0,
    downloadList: "[]",
    user: "[]"
  });
}

export const set = (key, value) => {
  const string = stringify(value);
  db.set(key, string);
}

export const get = (key, done) => {
  db.get(key)
    .then((value) => {
      const object = JSON.parse(value);
      done(null, object);
    })
    .catch((err) =>{
      done(err);
    });
}

export const incr = (key, done) => {
  db.incr(key);
  get("onlineUsers", done);
}

export const decr = (key, done) => {
  db.decr(key);
  get("onlineUsers", done);
}


function stringify(val) {
  return JSON.stringify(val);
}
