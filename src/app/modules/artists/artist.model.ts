import { Schema, model } from 'mongoose';
import { IPrimaryArtist } from './artist.interface';

const primaryArtistSchema = new Schema<IPrimaryArtist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    primaryArtistName: {
      type: String,
      required: true,
    },
    primaryArtistId: {
      type: Number,
      required: true,
    },
    primaryArtistAppleId: {
      type: String,
    },
    primaryArtistFacebookId: {
      type: String,
    },
    primaryArtistSpotifyId: {
      type: String,
    },
    primaryArtistYoutubeId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const PrimaryArtist = model('PrimaryArtist', primaryArtistSchema);
