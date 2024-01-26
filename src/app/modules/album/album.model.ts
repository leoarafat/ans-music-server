import { Schema, model } from 'mongoose';

const multipleMusicSchema = new Schema(
  {
    audio: [
      {
        path: {
          type: String,
          // required: true,
        },
        title: {
          type: String,
        },
        artist: {
          type: String,
        },
      },
    ],

    image: {
      type: String,
      // required: true,
    },

    status: {
      type: Boolean,
      default: false,
    },

    trackType: {
      type: String,
      enum: ['music', 'classic-music', 'jazz-music'],
      // required: true,
    },

    isRelease: {
      type: String,
      enum: ['yes', 'no'],
      // required: true,
    },

    instrumental: {
      type: String,
      enum: ['yes', 'no'],
      // required: true,
    },

    secondaryTrackType: {
      type: String,
      enum: ['original', 'karaoke', 'melody', 'cover', 'cover-by-band'],
      // required: true,
    },

    // Add more fields as needed

    primaryArtist: {
      type: [String],
      // required: true,
    },

    primaryArtistSpotifyId: {
      type: String,
      // required: true,
    },

    // ... (add more fields)

    tiktokStartInSecond: {
      type: String,
      // required: true,
    },

    trackLanguage: {
      type: String,
      // required: true,
    },

    releaseDate: {
      type: String,
      // required: true,
    },

    isAdvancePurchase: {
      type: Boolean,
      // required: true,
    },

    advancePurchaseDate: {
      type: String,
    },
    isApproved: {
      type: String,
      default: 'rejected',
    },
    correctionNote: {
      type: [String],
    },
    tackDown: {
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

export const Album = model('Album', multipleMusicSchema);
