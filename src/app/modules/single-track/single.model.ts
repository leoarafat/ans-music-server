import { Schema, model } from 'mongoose';
import { ISingleTrack } from './single.interface';

const singleMusicSchema = new Schema<ISingleTrack>(
  {
    audio: {
      path: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    },

    image: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: false,
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

    parentalAdvisory: {
      type: String,
      enum: ['explicit', 'no-explicit', 'edited'],
      required: true,
    },

    releaseTitle: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    line: {
      type: String,
      required: true,
    },

    primaryArtist: {
      type: [String],
      required: true,
    },

    primaryArtistSpotifyId: {
      type: String,
      required: true,
    },

    primaryArtistAppleId: {
      type: String,
      required: true,
    },

    primaryArtistFacebookId: {
      type: String,
      required: true,
    },

    primaryArtistYoutubeId: {
      type: String,
      required: true,
    },

    writer: {
      type: String,
      required: true,
    },

    composer: {
      type: String,
      required: true,
    },

    musicDirector: {
      type: String,
      required: true,
    },

    producer: {
      type: String,
      required: true,
    },

    actor: {
      type: String,
      required: true,
    },

    filmDirector: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    upcEan: {
      type: String,
      required: true,
    },

    subGenre: {
      type: String,
      required: true,
    },

    producerCatalogNumber: {
      type: String,
      required: true,
    },

    productionYear: {
      type: String,
      required: true,
    },

    labelName: {
      type: String,
      required: true,
    },

    publisher: {
      type: String,
      required: true,
    },

    youtubeUrl: {
      type: String,
      required: true,
    },

    isrc: {
      type: String,
      required: true,
    },

    catalogNumber: {
      type: String,
      required: true,
    },

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

export const SingleTrack = model('SingleTrack', singleMusicSchema);
