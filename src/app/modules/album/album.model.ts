import { Schema, model } from 'mongoose';

const multipleMusicSchema = new Schema(
  {
    audio: [
      {
        path: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        artist: {
          type: String,
          required: true,
        },
      },
    ],

    image: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    trackType: {
      type: String,
      enum: ['music', 'classic-music', 'jazz-music'],
      required: true,
    },

    isRelease: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },

    instrumental: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },

    secondaryTrackType: {
      type: String,
      enum: ['original', 'karaoke', 'melody', 'cover', 'cover-by-band'],
      required: true,
    },

    // Add more fields as needed

    primaryArtist: {
      type: [String],
      required: true,
    },

    primaryArtistSpotifyId: {
      type: String,
      required: true,
    },

    // ... (add more fields)

    tiktokStartInSecond: {
      type: String,
      required: true,
    },

    trackLanguage: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: String,
      required: true,
    },

    isAdvancePurchase: {
      type: Boolean,
      required: true,
    },

    advancePurchaseDate: {
      type: String,
    },
    isApproved: {
      type: String,
      enum: ['approved', 'rejected', 'pending'],
      default: 'pending',
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
