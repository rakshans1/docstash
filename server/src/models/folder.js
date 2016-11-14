var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var folderSchema = new Schema({
  name: String,
  userId: {type: Schema.Types.ObjectId, ref : 'user'},
  parentNode: {type: Schema.Types.ObjectId, ref : 'Folder'},
},{
    timestamps: true
});

module.exports = mongoose.model('Folder', folderSchema);
