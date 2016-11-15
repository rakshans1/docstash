import Files from '../models/file';


const searchFile = (req, res, next) => {
    let query = req.params.query;
    var regexp = new RegExp(query);
    Files.find({userId: req.user._id, name: regexp}, (err, files) => {
      res.send(files);
    })
}

export default searchFile;
