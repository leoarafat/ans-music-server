import { Schema, model } from 'mongoose';

const singleMusicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // audio: {
  //   type: String,
  //   required: true,
  // },
  audio: {
    path: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // Store the duration in seconds
      required: true,
    },
  },

  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
export const SingleTrack = model('SingleTrack', singleMusicSchema);
