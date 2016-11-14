import backend from '../services/backend';
import gm from 'gm';
import secret from '../config/secret';
import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
import stream from 'stream'

const imageMagick = gm.subClass({ imageMagick: true });

export const image = (req, res, next) => {
  const image = req.params.image;
  backend.get(image, (err,  stream) => {
    if (err) console.log(err);
    if (!stream) return res.status(404).send({error: 'File Not Found'});
    stream.on('error', (err) => {
      return res.status(404).send({error: 'File Not Found'});
    })
    stream.pipe(crypto.createDecipher(algorithm, secret.secret)).pipe(res)
  });
}

export const imageFull = (req, res, next) => {
  const image = req.params.image;
  backend.get(image, (err,  stream) => {
    if (err) console.log(err);

    // var base = imageMagick(crypto.createDecipher(algorithm, secret.secret))
    //           .resize(771, null, '>')
    //           .autoOrient();
    // write(base, res, next);
    stream.pipe(crypto.createDecipher(algorithm, secret.secret)).pipe(res)
  });
}
function write (base, res, next) {
  base.stream('png', function (err, stdout, stderr) {
    if (err) return next(err);
    // res.setHeader('Expires', new Date(Date.now() + 604800000));
    res.setHeader('Content-Type', 'image/png');
    stdout.pipe(res);
  });
}
