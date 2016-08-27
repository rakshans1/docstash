import mongoose, {Schema} from 'mongoose';

const shortnerSchema = new Schema({
  shortUrl: String,
  url: { type: String, unique: true},
  date_created: {type: Date, default: Date.now}
});

const model = mongoose.model('shortner', shortnerSchema);

export default  model;
