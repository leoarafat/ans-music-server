import { Schema, model } from 'mongoose';
import { IInterface } from './static.interface';

const singleMusicSchema = new Schema<IInterface>(
  {
    upc: {
      type: String,
      required: true,
    },
    isrc: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    revenue: {
      type: String,
      required: true,
    },
    stream_quantity: {
      type: String,
      required: true,
    },
    tracks: {
      type: String,
      // required: true,
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
