import mongoose, {Schema} from 'mongoose';


const fileSchema = new Schema({
  name: String,
  type: String, //mime type
  size: String,
  bytes: Number,
  parentNode: {type: Schema.Types.ObjectId, ref : 'Folder'},
  userId: {type: Schema.Types.ObjectId, ref : 'user'},
  reason: String
},{
    timestamps: true
});

const model = mongoose.model('File', fileSchema);
export default model;
