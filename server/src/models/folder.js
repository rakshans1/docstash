var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var folderSchema = new Schema({
  name: {type: String, unique: true, lowercase: true},
  userId: {type: Schema.Types.ObjectId, ref : 'user'}  
});

module.exports = mongoose.model('Folder', folderSchema);
