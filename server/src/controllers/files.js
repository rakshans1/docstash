import Files from '../models/file';
import Folders from '../models/folder';
import backend from '../services/backend';
import User from '../models/user';
import secret from '../config/secret';
import crypto from 'crypto';
const algorithm = 'aes-256-ctr';

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
export const fileFilter = (req, res, next) => {
    let fileFilter = req.params.fileFilter;
    var expression = null;
    if (fileFilter === 'musics') {
      expression = 'audio';
    } else if (fileFilter === 'images') {
      expression = 'image';
    } else if (fileFilter === 'videos') {
      expression = 'video';
    } else if (fileFilter === 'documents'){
      expression = 'application/pdf'
    } else {
      req.headers.type = 'filter'
      return recent(req, res, next);
    }
    var regexp = new RegExp("^"+ expression);
    Files.find({userId: req.user._id, type: regexp}, (err, files) => {
      res.send(files);
    })
}

export const download = (req, res, next) => {
  const fileId = req.params.fileId.toString();
  const user = req.user._id.toString();
  Files.findById(fileId, (err, file) => {
    if (err) return res.status(404);
    if (file.userId == user){
      backend.get(file._id.toString(), (err,  stream) => {
        if (err) return res.status(404).send({error: err});
        stream.on('error', (err) => {
          return res.status(404).send({error: 'File Not Found'});
        })
        res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
        res.setHeader('Content-Type', file.type);
        stream.pipe(crypto.createDecipher(algorithm, secret.secret)).pipe(res)
      });
    } else {
      res.status(404).send({error: 'File Not Found'});
    }
  });
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
  var limit = 5;
  if (req.headers.type === 'filter') limit = 20;
    Files.find({userId: req.user._id})
      .sort({updatedAt: 'desc'})
      .limit(limit)
      .exec((err, files) => {
        res.send(files)
      });
}

export const stream =  (req, res, next) => {
  const video = req.params.video;
  backend.get(video, (err,  stream) => {
    if (err) console.log(err);

    stream.pipe(crypto.createDecipher(algorithm, secret.secret)).pipe(res)
  });
}

export const rename = (req, res, next) => {
  const fileId = req.body.fileId;
  const newName = req.body.newName;
  const type = req.body.type;
  if (type === 'file'){
    Files.findById(fileId, (err, file) => {
      file.name = newName;
      file.reason = 'edited';
      file.save()
      res.status(200).send({message: 'File Renamed'})
    })
  } else {
    Folders.findById(fileId, (err, folder) => {
      folder.name = newName;
      folder.save();
      res.status(200).send({message: 'Folder Renamed'})
    });
  }
}

export const remove = (req, res, next) => {
  const fileId = req.body.fileId;
  const type = req.body.type;
  if (type === 'file'){
    Files.findById(fileId, (err, file) => {
      updateStorage(req.user._id, file.bytes);
      file.remove()
      backend.remove(file._id.toString(), (err) => {
        if (err) return console.log(err);
      });
      res.status(200).send({message: 'File Deleted'})
    })
  } else {
    Folders.findById(fileId, (err, folder) => {
      removeSubFolder(req.user._id, folder._id);
      folder.remove();
      removeSubFile(req.user._id, folder._id);
      res.status(200).send({message: 'Folder Deleted'})
    });
  }
}

function removeSubFolder(userId , folderId) {
  Folders.find({userId: userId, parentNode: folderId}, (err, folders) => {
    folders.forEach(folder => {
      folder.remove();
      removeSubFolder(userId, folder._id);
      removeSubFile(userId, folder._id);
    });
  });
}

function removeSubFile(userId , folderId) {
  Files.find({userId: userId, parentNode: folderId}, (err, files) => {
    files.forEach(file => {
      updateStorage(userId, file.bytes);
      file.remove();
      backend.remove(file._id.toString(), (err) => {
        if (err) return console.log(err);
      });
    });
  });
}

function updateStorage(userId, bytes) {
  User.findById(userId, (err, user) => {
    if (err) return console.log(err);
    user.storage = user.storage - bytes;
    user.save();
  });
}



export const torrent = (req, res, next) => {
  const fileId = req.params.fileId.toString();
  backend.get(`torrents/${fileId}`, (err,  stream) => {
    if (err) return res.status(404).send({error: err});
    stream.on('error', (err) => {
      return res.status(404).send({error: 'File Not Found'});
    })
    res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
    // res.setHeader('Content-Type', file.type);
    stream.pipe(res)
  });
}


export const move = (req, res, next) => {
  debugger;
  const fileId = req.body.fileId;
  const folderId = req.body.folderId;
  Files.findById(fileId, (err, file) => {
    file.parentNode = folderId;
    file.save();
    res.status(200).send({message: 'File moved'})
  })
} 