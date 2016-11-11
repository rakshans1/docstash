import Files from '../models/file';


export const file = (req, res, next) => {
    const email = req.user.email;
    Files.find({userId: req.user._id}, (err, files) => {
      res.send(files);
    })
}
