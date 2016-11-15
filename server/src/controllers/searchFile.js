import Files from '../models/file';
import Folders from '../models/folder';

const searchFile = (req, res, next) => {
    let query = req.params.query;
    var regexp = new RegExp(query, 'i');
    console.log(regexp);
    var result = {files: [], folders: []};
    Files.find({userId: req.user._id, name: regexp}, (err, files) => {
      result.files = files;
      Folders.find({userId: req.user._id, name: regexp}, "name", (err, folders) => {
        result.folders = folders;
        send();
      });
    });
    function send() {
      res.send(result);
    }
}

export default searchFile;
