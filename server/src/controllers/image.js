import backend from '../services/backend';
import secret from '../config/secret';
import crypto from 'crypto';
import im from 'imagemagick-stream';
const algorithm = 'aes-256-ctr';



export const image = (req, res, next) => {
  const image = req.params.image;
  backend.get(image, (err,  stream) => {
    if (err) console.log(err);
    if (!stream) return res.status(404).send({error: 'File Not Found'});
    stream.on('error', (err) => {
      return res.status(404).send({error: 'File Not Found'});
    })
    // res.setHeader('Expires', new Date(Date.now() + 604800000));
    const resize = im().resize('130x130').quality(50);
    stream.pipe(crypto.createDecipher(algorithm, secret.secret)).pipe(resize).pipe(res)
  });
}

export const imageFull = (req, res, next) => {
  const image = req.params.image;
  backend.get(image, (err,  stream) => {
    if (err) console.log(err);
    if (!stream) return res.status(404).send({error: 'File Not Found'});
    // res.setHeader('Expires', new Date(Date.now() + 604800000));
    const resize = im().resize('750x450\>').quality(50);
    stream.pipe(crypto.createDecipher(algorithm, secret.secret)).pipe(resize).pipe(res)
  });
}
