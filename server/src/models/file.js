import mongoose, {Schema} from 'mongoose';


const fileSchema = new Schema({
  name: String,
  type: String, //mime type
  size: String,
  parentNode: {type: Schema.Types.ObjectId, ref : 'Folder'},
  userId: {type: Schema.Types.ObjectId, ref : 'user'},
  reason: String,
  date_created: {
      type: Date,
      default: Date.now
  },
  last_updated: {
      type: Date,
      default: Date.now()
  }
});

const model = mongoose.model('File', fileSchema);
export default model;
