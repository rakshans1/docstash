import backend from '../services/backend';
import gm from 'gm';

const imageMagick = gm.subClass({ imageMagick: true });

export const image = (req, res, next) => {
  const image = req.params.image;
  backend.get(image, (err,  stream) => {
    if (err) console.log(err);
    stream.on('error', (err) => {
      return res.status(404).send({error: 'File Not Found'});
    })
    var base = imageMagick(stream)
              .resizeExact(135, 135)
              .autoOrient();
    write(base, res, next);
  });
}

export const imageFull = (req, res, next) => {
  const image = req.params.image;
  backend.get(image, (err,  stream) => {
    if (err) console.log(err);

    var base = imageMagick(stream)
              .resize(771, null, '>')
              .autoOrient();
    write(base, res, next);
    // stream.pipe(res)
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
