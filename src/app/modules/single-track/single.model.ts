/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
      // enum: ['yes', 'no'],
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
      type: [
        {
          //@ts-ignore
          type: Schema.Types.ObjectId,
          ref: 'PrimaryArtist',
        },
      ],
      validate: {
        validator: (subAreaArray: string | any[]) =>
          subAreaArray && subAreaArray.length > 0,
        message: 'At least one primaryArtist is required.',
      },
    },
    //!

    //!
    writer: {
      type: [
        {
          writerName: {
            type: String,
            required: true,
          },
          writerId: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },

    composer: {
      type: [
        {
          composerName: {
            type: String,
            required: true,
          },
          composerId: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    musicDirector: {
      type: [
        {
          musicDirectorName: {
            type: String,
            required: true,
          },
          musicDirectorId: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },

    producer: {
      type: [
        {
          producerName: {
            type: String,
            required: true,
          },
          producerId: {
            type: String,
            required: true,
          },
        },
      ],
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
    releaseId: {
      type: String,
      // required: true,
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

    label: {
      type: Schema.Types.ObjectId,
      ref: 'Label',
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
      // required: true,
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
      enum: ['approved', 'rejected', 'pending'],
      default: 'pending',
    },

    correctionNote: {
      type: [
        {
          text: {
            type: String,
          },
          isRead: {
            type: Boolean,
          },
        },
      ],
    },
    tackDown: {
      type: String,
    },
    songStatus: {
      type: String,
      enum: ['take-down', 'none', 'distribute'],
      default: 'none',
    },
    inspection: {
      type: String,
      enum: ['failed', 'none', 'saved'],
      default: 'none',
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
