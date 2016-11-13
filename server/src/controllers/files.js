import Files from '../models/file';
import Folders from '../models/folder';
import backend from '../services/backend';

export const file = (req, res, next) => {
    let parentNode = null
    if (req.query.folderId !== 'null') {
      parentNode = req.query.folderId;
    }
    Files.find({userId: req.user._id, parentNode: parentNode}, (err, files) => {
      res.send(files);
    })
}
export const folder = (req, res, next) => {
    let parentNode = null
    if (req.query.folderId !== 'null') {
      parentNode = req.query.folderId;
    }
    Folders.find({userId: req.user._id, parentNode: parentNode}, "name", (err, folders) => {
      res.send(folders);
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


export const folderNew = (req, res, next) => {
  const folderId = req.query.location;
  const folderName = req.params.folderName.toString();
  const userId = req.user._id;
  const folder = new Folders();
  folder.name = folderName;
  folder.userId = userId;
  if (folderId !== 'null'){
    folder.parentNode = folderId;
  }
  folder.save(err => {
    if (err) return next(err);
    res.status(200).send({message: 'Folder Created'})
  });
}
export const recent = (req, res, next) => {
    Files.find({userId: req.user._id})
      .sort('-date')
      .limit(5)
      .exec((err, files) => {
        res.send(files)
      });
}

export const stream =  (req, res, next) => {
  const video = req.params.video;
  backend.get(video, (err,  stream) => {
    if (err) console.log(err);

    stream.pipe(res)
  });
}
