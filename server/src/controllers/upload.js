import path from 'path';
import formidable from 'formidable';
import fs from 'fs';

const upload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/../../tmp');

  form.on('file', (field, file) => {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
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
