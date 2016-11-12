import Files from '../models/file';
import backend from '../services/backend';

export const file = (req, res, next) => {
    const email = req.user.email;
    Files.find({userId: req.user._id}, (err, files) => {
      res.send(files);
    })
}

export const download = (req, res, next) => {
  const fileId = req.params.fileId.toString();
  const user = req.user._id.toString();
  Files.findById(fileId, (err, file) => {
    if (err) return res.status(404);
    if (file.userId == user){
      backend.get(file.name, (err,  stream) => {
        if (err) res.status(404).send({error: err});
        stream.on('error', (err) => {
          return res.status(404).send({error: 'File Not Found'});
        })
        res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
        console.log(file)
        res.setHeader('Content-Type', file.type);
        stream.pipe(res)
      });
    } else {
      res.status(404).send({error: 'File Not Found'});
    }
  });
  // console.log(fileName);
  // res.status(200).send({error: `Downloading ${fileName}`});
}
