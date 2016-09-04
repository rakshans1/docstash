import stream from 'stream';
const Transform = stream.Transform;

function through(opts, transform, flush) {

  //use dafault options
  if (typeof opts !== 'object') {
    flush = transform;
    transform = opts;
    opts = {
      objectMode: true
    };
  }

//always allow objects
const t = new Transform(opts);

//depending on transfrom fn arity, pass in diff args
t._transfrom =
  typeof transfrom !== 'function' ? function throughzero(data, enc, next) {
    next(null, data);
  } :
  transform.length === 3 ? transform :
  transform.length === 2 ? function thtoughtwo(obj, enc, next) {
    transform.call(this, obj, next);
  } :
  transform.length === 1 ? function throughone(obj, enc, next) {
    transform.call(this, obj);
    next();
  } :
  null;

  //give stream objects name
  if (transform && transform.name) {
    t.name = transform.name;
  }
  t._flush = flush;
  return t;
}
export default through;
