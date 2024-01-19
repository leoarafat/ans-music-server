import { Schema, model } from 'mongoose';

const multipleMusicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    // required: true,
  },
  audio: {
    path: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // Assuming you want to store duration as a formatted string
      required: true,
    },
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const MultipleTrack = model('MultipleTrack', multipleMusicSchema);
