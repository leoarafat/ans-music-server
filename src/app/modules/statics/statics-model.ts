import { Schema, model } from 'mongoose';
import { IInterface } from './static.interface';

const singleMusicSchema = new Schema<IInterface>(
  {
    upc: {
      type: String,
      // required: true,
    },
    isrc: {
      type: String,
      // required: true,
    },
    album: {
      type: String,
      // default: true,
    },
    artist: {
      type: String,
      // default: true,
    },
    country: {
      type: String,
      // default: true,
    },
    label: {
      type: String,
      // default: true,
    },
    revenue: {
      type: String,
      // default: true,
    },
    stream_quantity: {
      type: String,
      // default: true,
    },
    tracks: {
      type: String,
      // default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Statics = model('Static', singleMusicSchema);
