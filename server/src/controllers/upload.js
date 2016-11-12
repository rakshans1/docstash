import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import File from '../models/file';
import User from '../models/user';
import units from '../util/units';
import backend from '../services/backend';
import secret from '../config/secret';

const upload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  const TMP_DIR = path.resolve(secret.TMP_DIR);
  form.multiples = true;
  form.uploadDir = TMP_DIR;

  form.on('file', (field, file) => {
  //upload the file to backend
    const stream = fs.createReadStream(file.path);
    backend.upload(stream, undefined , file.name, file.length, undefined, (err) => {
      if(err) return console.log(err);
      fs.unlink(file.path, err => {
        if (err) console.log(err);
      });
    });

    // fs.rename(file.path, path.join(form.uploadDir, file.name));
    User.findOne({_id: req.user._id}, (err, user) => {
      if (err) return next(err);
      user.storage = user.storage + file.size;
      user.save(err => {
        if (err) return next(err);
      });
    });
    const fileInDb = new File();
    fileInDb.userId = req.user._id;
    fileInDb.name = file.name;
    fileInDb.type = file.type;
    fileInDb.size = units(file.size);
    fileInDb.save(err => {
      if (err) return next(err);
    });
  });

  form.on('error', (err) => {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', () => {
    res.end('success');
  });

  form.parse(req);
}

export default upload;
