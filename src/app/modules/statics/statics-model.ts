import { Schema, model } from 'mongoose';

const singleMusicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
export const Excel = model('Excel', singleMusicSchema);
