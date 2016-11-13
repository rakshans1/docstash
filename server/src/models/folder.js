var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var folderSchema = new Schema({
  name: String,
  userId: {type: Schema.Types.ObjectId, ref : 'user'},
  parentNode: {type: Schema.Types.ObjectId, ref : 'Folder'},
  date_created: {
      type: Date,
      default: Date.now
  },
  last_updated: {
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model('Folder', folderSchema);
